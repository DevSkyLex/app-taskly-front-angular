import { Component, computed, input, InputSignal, output, OutputEmitterRef, Signal } from '@angular/core';

export type ButtonVariant = 
  | 'primary' 
  | 'secondary'
  | 'outlined'
  | 'ghost'
  | 'destructive';

export type ButtonSize =
  | 'sm'
  | 'md'
  | 'lg'
  | 'icon-sm'
  | 'icon-md'
  | 'icon-lg';

export type ButtonType =
  | 'button'
  | 'submit'
  | 'reset';

@Component({
  selector: 'app-button',
  standalone: false,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  //#region Propriétés
  /**
   * Propriété variant
   * @readonly
   * 
   * Variante du bouton
   * 
   * @access public
   * @memberof ButtonComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<ButtonVariant>} variant
   */
  public readonly variant: InputSignal<ButtonVariant> = 
    input<ButtonVariant>('primary');

  /**
   * Propriété size
   * @readonly
   * 
   * Taille du bouton
   * 
   * @access public
   * @memberof ButtonComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<ButtonSize>} size
   */
  public readonly size: InputSignal<ButtonSize> =
    input<ButtonSize>('md');

  /**
   * Propriété disabled
   * @readonly
   * 
   * Indique si le bouton est désactivé
   * 
   * @access public
   * @memberof ButtonComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<boolean>} disabled
   */
  public readonly disabled: InputSignal<boolean> =
    input<boolean>(false);

  /**
   * Propriété loading
   * @readonly
   * 
   * Indique si le bouton est en mode
   * chargement
   * 
   * @access public
   * @memberof ButtonComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<boolean>} loading
   */
  public readonly loading: InputSignal<boolean> =
    input<boolean>(false);

  /**
   * Propriété fullWidth
   * @readonly
   * 
   * Indique si le bouton occupe toute 
   * la largeur de son conteneur
   * 
   * @access public
   * @memberof ButtonComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<boolean>} fullWidth
   */
  public readonly fullWidth: InputSignal<boolean> =
    input<boolean>(false);

  /**
   * Propriété type
   * @readonly
   * 
   * Type du bouton
   * 
   * @access public
   * @memberof ButtonComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<ButtonType>} type
   */
  public readonly type: InputSignal<ButtonType> =
    input<ButtonType>('button');

  /**
   * Propriété classes
   * @readonly
   * 
   * Classes CSS du bouton
   * 
   * @access public
   * @memberof ButtonComponent
   * @since 1.0.0
   * 
   * @type {Signal<string[]>} classes
   */
  public readonly classes: Signal<string[]> = computed(() => {
    return [
      'btn',
      `btn--${this.variant()}`,
      `btn--${this.size()}`,
      this.fullWidth() ? 'btn--full-width' : '',
    ];
  });
  //#endregion
}
