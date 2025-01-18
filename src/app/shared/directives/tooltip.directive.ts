import {
  ConnectedPosition,
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayPositionBuilder,
  OverlayRef,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  inject,
  input,
  InputSignal,
  OnDestroy,
  signal,
  Signal,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { TooltipComponent } from '../components/tooltip/tooltip.component';

export type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left';

@Directive({
  selector: '[app-tooltip]',
  standalone: false,
})
export class TooltipDirective implements OnDestroy {
  //#region Propriétés
  /**
   * Propriété content
   * @readonly
   *
   * Contenu du tooltip
   *
   * @access public
   * @memberof TooltipDirective
   * @since 1.0.0
   *
   * @type {InputSignal<string | TemplateRef<any>>} content
   */
  public readonly content: InputSignal<string | TemplateRef<any>> =
    input.required<string | TemplateRef<any>>({ alias: 'app-tooltip' });

  /**
   * Propriété placement
   * @readonly
   *
   * Placement du tooltip
   *
   * @access public
   * @memberof TooltipDirective
   * @since 1.0.0
   *
   * @type {InputSignal<TooltipPlacement>} placement
   */
  public readonly placement: InputSignal<TooltipPlacement> =
    input<TooltipPlacement>('top');

  /**
   * Propriété elementRef
   * @readonly
   *
   * Référence de l'élément
   *
   * @access private
   * @memberof TooltipDirective
   * @since 1.0.0
   *
   * @type {ElementRef} elementRef
   */
  private readonly elementRef: ElementRef = inject<ElementRef>(ElementRef);

  /**
   * Propriété overlay
   * @readonly
   *
   * Service de superposition
   *
   * @access private
   * @memberof TooltipDirective
   * @since 1.0.0
   *
   * @type {Overlay} overlay
   */
  private readonly overlay: Overlay = inject<Overlay>(Overlay);

  /**
   * Propriété viewContainerRef
   * @readonly
   *
   * Référence du conteneur de vue
   *
   * @access private
   * @memberof TooltipDirective
   * @since 1.0.0
   *
   * @type {ViewContainerRef} viewContainerRef
   */
  private readonly viewContainerRef: ViewContainerRef =
    inject<ViewContainerRef>(ViewContainerRef);

  /**
   * Propriété overlayRef
   * @readonly
   *
   * Référence de superposition
   *
   * @access private
   * @memberof TooltipDirective
   * @since 1.0.0
   *
   * @type {OverlayRef | null} overlayRef
   */
  private overlayRef: OverlayRef | null = null;

  /**
   * Propriété offset
   * @readonly
   *
   * Décalage du tooltip
   *
   * @access private
   * @memberof TooltipDirective
   * @since 1.0.0
   *
   * @type {Signal<number>} offset
   */
  private readonly offset: Signal<number> = signal<number>(5);

  /**
   * Propriété positions
   * @readonly
   * 
   * Positions du tooltip
   * 
   * @access private
   * @memberof TooltipDirective
   * @since 1.0.0
   * 
   * @type {Signal<Record<TooltipPlacement, ConnectedPosition[]>>} positions
   */
  private readonly positions: Signal<Record<TooltipPlacement, ConnectedPosition[]>> = signal<Record<TooltipPlacement, ConnectedPosition[]>>({
    top: [
      {
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom',
        offsetY: -this.offset(),
      },
    ],
    right: [
      {
        originX: 'end',
        originY: 'center',
        overlayX: 'start',
        overlayY: 'center',
        offsetX: this.offset(),
      },
    ],
    bottom: [
      {
        originX: 'center',
        originY: 'bottom',
        overlayX: 'center',
        overlayY: 'top',
        offsetY: this.offset(),
      },
    ],
    left: [
      {
        originX: 'start',
        originY: 'center',
        overlayX: 'end',
        overlayY: 'center',
        offsetX: -this.offset(),
      },
    ],
  });
  //#endregion

  //#region Méthodes
  /**
   * Méthode show
   *
   * Affiche le tooltip
   *
   * @access public
   * @memberof TooltipDirective
   * @since 1.0.0
   *
   * @returns {void} - Ne retourne rien
   */
  @HostListener('mouseenter')
  public show(): void {
    /**
     * Création de la stratégie de
     * positionnement
     *
     * @type {FlexibleConnectedPositionStrategy}
     */
    const positionStrategy: FlexibleConnectedPositionStrategy = this.positionStrategy;
    this.overlayRef = this.overlay.create({ positionStrategy });

    /**
     * Création du portail du tooltip
     *
     * @type {ComponentPortal<TooltipComponent>}
     */
    const tooltipPortal: ComponentPortal<TooltipComponent> =
      new ComponentPortal<TooltipComponent>(
        TooltipComponent,
        this.viewContainerRef
      );

    /**
     * Référence du tooltip
     *
     * @type {ComponentRef<TooltipComponent>}
     */
    const tooltipRef: ComponentRef<TooltipComponent> =
      this.overlayRef.attach(tooltipPortal);
    tooltipRef.instance.content.set(this.content());
  }

  /**
   * Méthode hide
   *
   * Cache le tooltip
   *
   * @access public
   * @memberof TooltipDirective
   * @since 1.0.0
   *
   * @returns {void} - Ne retourne rien
   */
  @HostListener('mouseleave')
  public hide(): void {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef = null;
    }
  }

  /**
   * Méthode positionStrategy (getter)
   * 
   * Retourne la stratégie de positionnement
   * 
   * @access private
   * @memberof TooltipDirective
   * @since 1.0.0
   * 
   * @returns {FlexibleConnectedPositionStrategy} - Retourne la stratégie de positionnement
   */
  private get positionStrategy(): FlexibleConnectedPositionStrategy {
    const connnectedPositions: ConnectedPosition[] = this.positions()[this.placement()];

    const fallbackPositions: ConnectedPosition[] = [
      ...this.positions()['top'],
      ...this.positions()['right'],
      ...this.positions()['bottom'],
      ...this.positions()['left'],
    ].filter((position: ConnectedPosition) => 
      !connnectedPositions.includes(position)
    );

    return this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef)
      .withPositions([ 
        ...connnectedPositions, 
        ...fallbackPositions 
      ]);
  }

  /**
   * Méthode ngOnDestroy
   *
   * Détruit le tooltip
   *
   * @access public
   * @memberof TooltipDirective
   * @since 1.0.0
   *
   * @returns {void} - Ne retourne rien
   */
  public ngOnDestroy(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
  //#endregion
}
