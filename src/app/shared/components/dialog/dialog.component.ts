import { Component, contentChild, effect, ElementRef, inject, input, InputSignal, model, ModelSignal, signal, Signal, TemplateRef, viewChild, ViewContainerRef } from '@angular/core';
import { DialogHeaderComponent } from './dialog-header/dialog-header.component';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { DialogFooterComponent } from './dialog-footer/dialog-footer.component';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { transition, trigger, useAnimation } from '@angular/animations';
import { AnimationTiming, AppAnimations } from '@app/shared/animations/app.animations';

@Component({
  selector: 'app-dialog',
  standalone: false,
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  exportAs: 'dialog',
  animations: [
    trigger('popAnimation', [
      transition(':enter', [
        useAnimation(AppAnimations.popIn, {
          params: { 
            timing: AnimationTiming.FAST,
            origin: 'center' 
          },
        }),
      ]),
      transition(':leave', [
        useAnimation(AppAnimations.popOut, {
          params: { 
            timing: AnimationTiming.FAST,
            origin: 'center'
          },
        }),
      ]),
    ]),
  ],
})
export class DialogComponent {
  //#region Propriétés
  /**
   * Propriété header
   * @readonly
   * 
   * En-tête de la boîte de dialogue
   * 
   * @access public
   * @memberof DialogComponent
   * @since 1.0.0
   * 
   * @type {Signal<DialogHeaderComponent>} header
   */
  public readonly header: Signal<DialogHeaderComponent | undefined> =
    contentChild<DialogHeaderComponent>(DialogHeaderComponent);

  /**
   * Propriété body
   * @readonly
   * 
   * Corps de la boîte de dialogue
   * 
   * @access public
   * @memberof DialogComponent
   * @since 1.0.0
   * 
   * @type {Signal<DialogBodyComponent>} body
   */
  public readonly body: Signal<DialogBodyComponent> =
    contentChild.required<DialogBodyComponent>(DialogBodyComponent);

  /**
   * Propriété footer
   * @readonly
   * 
   * Pied de la boîte de dialogue
   * 
   * @access public
   * @memberof DialogComponent
   * @since 1.0.0
   * 
   * @type {Signal<DialogFooterComponent>} footer
   */
  public readonly footer: Signal<DialogFooterComponent | undefined> =
    contentChild<DialogFooterComponent>(DialogFooterComponent);

  /**
   * Propriété closable
   * @readonly
   * 
   * Indique si la boîte de dialogue 
   * est fermable
   * 
   * @access public
   * @memberof DialogComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<boolean>} closable
   */
  public readonly closable: InputSignal<boolean> = 
    input<boolean>(true);

  /**
   * Propriété visible
   * @readonly
   * 
   * Indique si la boîte de dialogue
   * est visible
   * 
   * @access public
   * @memberof DialogComponent
   * @since 1.0.0
   * 
   * @type {ModelSignal<boolean>} visible
   */
  public readonly visible: ModelSignal<boolean> =
    model<boolean>(false);

  /**
   * Propriété overlay
   * @readonly
   * 
   * Service de superposition
   * 
   * @access private
   * @memberof DialogComponent
   * @since 1.0.0
   * 
   * @type {Overlay} overlay
   */
  private readonly overlay: Overlay =
    inject<Overlay>(Overlay);

  /**
   * Propriété viewContainerRef
   * @readonly
   * 
   * Référence du conteneur de vue
   * 
   * @access private
   * @memberof DialogComponent
   * @since 1.0.0
   * 
   * @type {ViewContainerRef} viewContainerRef
   */
  private readonly viewContainerRef: ViewContainerRef =
    inject<ViewContainerRef>(ViewContainerRef);

  /**
   * Propriété template
   * @readonly
   * 
   * Template de la boîte de dialogue
   * 
   * @access private
   * @memberof DialogComponent
   * @since 1.0.0
   * 
   * @type {Signal<TemplateRef<any>>} template
   */
  private readonly template: Signal<TemplateRef<any>> =
    viewChild.required<TemplateRef<any>>(TemplateRef);

  /**
   * Propriété overlayRef
   * 
   * Référence de superposition
   * 
   * @access private
   * @memberof DialogComponent
   * @since 1.0.0
   * 
   * @type {OverlayRef | null} overlayRef
   */
  private overlayRef: OverlayRef | null = null;
  //#endregion

  //#region Constructeur
  /**
   * Constructeur
   * @constructor
   * 
   * Initialise les services et les propriétés
   * 
   * @access public
   * @memberof DialogComponent
   * @since 1.0.0
   */
  public constructor() {
    effect(() => {
      const visible: boolean = this.visible();
      visible ? this.createOverlay() : this.destroyOverlay();
    })
  }
  //#endregion

  //#region Méthodes
  /**
   * Méthode createOverlay
   * 
   * Crée la superposition de la boîte 
   * de dialogue
   * 
   * @access private
   * @memberof DialogComponent
   * @since 1.0.0
   * 
   * @returns {void} - Ne retourne rien
   */
  private createOverlay(): void {
    if (this.overlayRef) return;

    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'overlay-blur',
      panelClass: 'dialog-panel',
      positionStrategy: this.overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically()
    });

    const portal: TemplatePortal = new TemplatePortal(
      this.template(),
      this.viewContainerRef
    );

    this.overlayRef.attach(portal);

    this.overlayRef.backdropClick().subscribe(() => this.hide());

    this.overlayRef.keydownEvents().subscribe((event: KeyboardEvent) => {
      if (event.key === 'Escape') this.hide();
    });
  }

  /**
   * Méthode destroyOverlay
   * 
   * Détruit la superposition de la boîte
   * de dialogue
   * 
   * @access private
   * @memberof DialogComponent
   * @since 1.0.0
   * 
   * @returns {void} - Ne retourne rien
   */
  private destroyOverlay(): void {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  /**
   * Méthode show
   * 
   * Affiche la boîte de dialogue
   * 
   * @access public
   * @memberof DialogComponent
   * @since 1.0.0
   * 
   * @returns {void} - Ne retourne rien
   */
  public show(): void {
    this.visible.set(true);
  }

  /**
   * Méthode hide
   * 
   * Cache la boîte de dialogue
   * 
   * @access public
   * @memberof DialogComponent
   * @since 1.0.0
   * 
   * @returns {void} - Ne retourne rien
   */
  public hide(): void {
    this.visible.set(false);
  }

  /**
   * Méthode toggle
   * 
   * Affiche ou cache la boîte de dialogue
   * 
   * @access public
   * @memberof DialogComponent
   * @since 1.0.0
   * 
   * @returns {void} - Ne retourne rien
   */
  public toggle(): void {
    this.visible.update((visible) => !visible);
  }
  //#endregion
}
