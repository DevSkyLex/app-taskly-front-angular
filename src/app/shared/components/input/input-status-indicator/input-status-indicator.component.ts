import { Component, computed, Input, input, InputSignal, Signal, WritableSignal } from '@angular/core';
import { FormControlStatus } from '@angular/forms';

@Component({
  selector: 'app-input-status-indicator',
  standalone: false,
  templateUrl: './input-status-indicator.component.html',
  styleUrl: './input-status-indicator.component.scss'
})
export class InputStatusIndicatorComponent {
  //#region Propriétés
  /**
   * Propriété status
   * @readonly
   * 
   * Permet de définir le statut du contrôle
   * 
   * @access public
   * @memberof InputStatusIndicatorComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<FormControlStatus>} status
   */
  public readonly status: InputSignal<FormControlStatus> = 
    input<FormControlStatus>('DISABLED');

  /**
   * Propriété visible
   * @readonly
   * 
   * Permet de définir la visibilité du composant
   * 
   * @access public
   * @memberof InputStatusIndicatorComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<boolean>} visible
   */
  public readonly visible: InputSignal<boolean> =
    input<boolean>(true);

  /**
   * Propriété classes
   * @readonly
   * 
   * Permet de définir les classes CSS
   * 
   * @access public
   * @memberof InputStatusIndicatorComponent
   * @since 1.0.0
   * 
   * @type {Signal<string[]>} classes
   */
  public readonly classes: Signal<string[]> = computed(() => {
    return [
      'input-status-indicator',
      'input-status-indicator--' + this.status().toLowerCase()
    ]
  });
  //#endregion
}
