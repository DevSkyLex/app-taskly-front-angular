import { transition, trigger, useAnimation } from '@angular/animations';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  Component,
  contentChild,
  effect,
  inject,
  input,
  InputSignal,
  model,
  ModelSignal,
  Signal,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { AnimationTiming, AppAnimations } from '@app/shared/animations/app.animations';
import { ButtonSize } from '../button/button.component';
import { DropdownTriggerComponent } from './dropdown-trigger/dropdown-trigger.component';
import { DropdownContentComponent } from './dropdown-content/dropdown-content.component';

@Component({
  selector: 'app-dropdown',
  standalone: false,
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  exportAs: 'dropdown',
  animations: [
    trigger('popAnimation', [
      transition(':enter', [
        useAnimation(AppAnimations.popIn, {
          params: {
            timing: AnimationTiming.FAST,
            origin: 'top',
          },
        }),
      ]),
      transition(':leave', [
        useAnimation(AppAnimations.popOut, {
          params: {
            timing: AnimationTiming.FAST,
            origin: 'top',
          },
        }),
      ]),
    ]),
  ],
})
export class DropdownComponent {
  //#region Propriétés
  /**
   * Propriété visible
   * @readonly
   *
   * Indique si le menu déroulant
   * est visible
   *
   * @access public
   * @memberof DropdownComponent
   * @since 1.0.0
   *
   * @type {ModelSignal<boolean>} visible
   */
  public readonly visible: ModelSignal<boolean> = 
    model<boolean>(false);

  /**
   * Propriété size
   * @readonly
   * 
   * Taille du bouton
   * 
   * @access public
   * @memberof DropdownComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<ButtonSize>} size
   */
  public readonly size: InputSignal<ButtonSize> =
    input<ButtonSize>('md');

  /**
   * Propriété trigger
   * @readonly
   * 
   * Déclencheur du menu déroulant
   * 
   * @access public
   * @memberof DropdownComponent
   * @since 1.0.0
   * 
   * @type {Signal<DropdownTriggerComponent>} trigger
   */
  public readonly trigger: Signal<DropdownTriggerComponent> =
    contentChild.required<DropdownTriggerComponent>(DropdownTriggerComponent);

  /**
   * Propriété content
   * @readonly
   * 
   * Contenu du menu déroulant
   * 
   * @access public
   * @memberof DropdownComponent
   * @since 1.0.0
   * 
   * @type {Signal<DropdownContentComponent>} content
   */
  public readonly content: Signal<DropdownContentComponent> =
    contentChild.required<DropdownContentComponent>(DropdownContentComponent);
  //#endregion

  //#region Méthodes
  /**
   * Méthode show
   *
   * Affiche la boîte de dialogue
   *
   * @access public
   * @memberof DropdownComponent
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
   * @memberof DropdownComponent
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
   * @memberof DropdownComponent
   * @since 1.0.0
   *
   * @returns {void} - Ne retourne rien
   */
  public toggle(): void {
    this.visible.update((visible) => !visible);
  }
  //#endregion
}
