import { Component, input, InputSignal, model, ModelSignal } from '@angular/core';

@Component({
  selector: 'app-command-input',
  standalone: false,
  
  templateUrl: './command-input.component.html',
  styleUrl: './command-input.component.scss'
})
export class CommandInputComponent {
  //#region Propriétés
  /**
   * Propriété placeholder
   * @readonly
   * 
   * Définit le texte d'aide
   * 
   * @access public
   * @memberof CommandInputComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<string>} placeholder
   */
  public readonly placeholder: InputSignal<string> =
    input<string>('');

  /**
   * Propriété value
   * @readonly
   * 
   * Définit la valeur du champ
   * 
   * @access public
   * @memberof CommandInputComponent
   * @since 1.0.0
   * 
   * @type {ModelSignal<string>} value
   */
  public readonly value: ModelSignal<string> = 
    model<string>('');
  //#endregion
  
  //#region Méthodes
  /**
   * Méthode onInput
   * 
   * Met à jour la valeur du champ
   * 
   * @access public
   * @memberof CommandInputComponent
   * @since 1.0.0
   * 
   * @param {Event} event - Événement
   * 
   * @returns {void} - Ne retourne rien
   */
  public onInput(event: Event): void {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    this.value.set(target.value);
  }

  /**
   * Méthode clear
   * 
   * Efface la valeur du champ
   * 
   * @access public
   * @memberof CommandInputComponent
   * @since 1.0.0
   * 
   * @returns {void} - Ne retourne rien
   */
  public clear(): void {
    this.value.set('');
  }
  //#e,thode clear
}
