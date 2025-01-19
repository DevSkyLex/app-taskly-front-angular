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
   * Propriété click
   * @readonly
   * 
   * Événement de clic sur le bouton
   * 
   * @access public
   * @memberof ButtonComponent
   * @since 1.0.0
   * 
   * @type {OutputEmitterRef<MouseEvent>} click
   */
  public readonly click: OutputEmitterRef<MouseEvent> =
    output<MouseEvent>();

  /**
   * Propriété mouseenter
   * @readonly
   * 
   * Événement de survol de la souris
   * 
   * @access public
   * @memberof ButtonComponent
   * @since 1.0.0
   * 
   * @type {OutputEmitterRef<MouseEvent>} mouseenter
   */
  public readonly mouseenter: OutputEmitterRef<MouseEvent> =
    output<MouseEvent>();

  /**
   * Propriété mouseleave
   * @readonly
   * 
   * Événement de sortie de la souris
   * 
   * @access public
   * @memberof ButtonComponent
   * @since 1.0.0
   * 
   * @type {OutputEmitterRef<MouseEvent>} mouseleave
   */
  public readonly mouseleave: OutputEmitterRef<MouseEvent> =
    output<MouseEvent>();

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

  //#region Méthodes
  /**
   * Méthode onClick
   * 
   * Gère l'événement de clic sur le bouton
   * 
   * @access public
   * @memberof ButtonComponent
   * @since 1.0.0
   * 
   * @param {MouseEvent} event - Événement de clic
   * 
   * @returns {void} - Ne retourne rien
   */
  public onClick(event: MouseEvent): void {
    this.click.emit(event);
  }

  /**
   * Méthode onMouseEnter
   * 
   * Gère l'événement de survol de 
   * la souris
   * 
   * @access public
   * @memberof ButtonComponent
   * @since 1.0.0
   * 
   * @param {MouseEvent} event - Événement de survol
   * 
   * @returns {void} - Ne retourne rien
   */
  public onMouseEnter(event: MouseEvent): void {
    this.mouseenter.emit(event);
  }

  /**
   * Méthode onMouseLeave
   * 
   * Gère l'événement de sortie de 
   * la souris
   * 
   * @access public
   * @memberof ButtonComponent
   * @since 1.0.0
   * 
   * @param {MouseEvent} event - Événement de sortie
   * 
   * @returns {void} - Ne retourne rien
   */
  public onMouseLeave(event: MouseEvent): void {
    this.mouseleave.emit(event);
  }
  //#endregion
}
