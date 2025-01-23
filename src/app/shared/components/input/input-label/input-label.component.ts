import { Component, computed, input, InputSignal, Signal } from '@angular/core';

@Component({
  selector: 'app-input-label',
  standalone: false,
  templateUrl: './input-label.component.html',
  styleUrl: './input-label.component.scss'
})
export class InputLabelComponent {
  //#region Propriétés
  /**
   * Propriété for
   * @readonly
   * 
   * Permet de définir l'attribut for du 
   * label et d'associer le label à un input
   * 
   * @access public
   * @memberof InputLabelComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<string | null>} for
   */
  public readonly for: InputSignal<string | null> =
    input<string | null>(null);

  /**
   * Propriété required
   * @readonly
   * 
   * Permet de définir si le champ est 
   * requis
   * 
   * @access public
   * @memberof InputLabelComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<boolean>} required
   */
  public readonly required: InputSignal<boolean> =
    input<boolean>(false);

  /**
   * Propriété classes
   * @readonly
   * 
   * Permet de définir les classes du label
   * 
   * @access public
   * @memberof InputLabelComponent
   * @since 1.0.0
   * 
   * @type {Signal<string[]>} classes
   */
  public readonly classes: Signal<string[]> = computed(() => {
    return [
      'input-label',
      this.required() ? 'input-label--required' : ''
    ];
  });
  //#endregion
}
