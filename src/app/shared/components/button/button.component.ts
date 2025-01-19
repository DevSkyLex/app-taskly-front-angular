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
   * Propriété dbclick
   * @readonly
   * 
   * Événement de double-clic sur le bouton
   * 
   * @access public
   * @memberof ButtonComponent
   * @since 1.0.0
   * 
   * @type {OutputEmitterRef<MouseEvent>} dbclick
   */
  public readonly dbclick: OutputEmitterRef<MouseEvent> =
    output<MouseEvent>();

  /**
   * Propriété mousedown
   * @readonly
   * 
   * Événement de clic maintenu 
   * sur le bouton
   * 
   * @access public
   * @memberof ButtonComponent
   * @since 1.0.0
   * 
   * @type {OutputEmitterRef<MouseEvent>} mousedown
   */
  public readonly mousedown: OutputEmitterRef<MouseEvent> =
    output<MouseEvent>();

  /**
   * Propriété mouseup
   * @readonly
   * 
   * Événement de relâchement du clic 
   * sur le bouton
   * 
   * @access public
   * @memberof ButtonComponent
   * @since 1.0.0
   * 
   * @type {OutputEmitterRef<MouseEvent>} mouseup
   */
  public readonly mouseup: OutputEmitterRef<MouseEvent> =
    output<MouseEvent>();

  /**
   * Propriété focus
   * 
   * Événement de focus sur le bouton
   * 
   * @access public
   * @memberof ButtonComponent
   * @since 1.0.0
   * 
   * @type {OutputEmitterRef<FocusEvent>} focus
   */
  public readonly focus: OutputEmitterRef<FocusEvent> =
    output<FocusEvent>();

  /**
   * Propriété blur
   * 
   * Événement de perte de focus sur le bouton
   * 
   * @access public
   * @memberof ButtonComponent
   * @since 1.0.0
   * 
   * @type {OutputEmitterRef<FocusEvent>} blur
   */
  public readonly blur: OutputEmitterRef<FocusEvent> =
    output<FocusEvent>();

  /**
   * Propriété contextMenu
   * @readonly
   * 
   * Événement du menu contextuel
   * 
   * @access public
   * @memberof ButtonComponent
   * @since 1.0.0
   * 
   * @type {OutputEmitterRef<MouseEvent>} contextMenu
   */
  public readonly contextMenu: OutputEmitterRef<MouseEvent> =
    output<MouseEvent>();

  /**
   * Propriété keydown
   * @readonly
   * 
   * Événement de pression d'une touche
   * du clavier sur le bouton
   * 
   * @access public
   * @memberof ButtonComponent
   * @since 1.0.0
   * 
   * @type {OutputEmitterRef<KeyboardEvent>} keydown
   */
  public readonly keydown: OutputEmitterRef<KeyboardEvent> =
    output<KeyboardEvent>();

  /**
   * Propriété keyup
   * @readonly
   * 
   * Événement de relâchement d'une touche
   * du clavier sur le bouton
   * 
   * @access public
   * @memberof ButtonComponent
   * @since 1.0.0
   * 
   * @type {OutputEmitterRef<KeyboardEvent>} keyup
   */
  public readonly keyup: OutputEmitterRef<KeyboardEvent> =
    output<KeyboardEvent>();

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

  /**
   * Méthode onDoubleClick
   * 
   * Gère l'événement de double-clic 
   * sur le bouton
   * 
   * @access public
   * @memberof ButtonComponent
   * @since 1.0.0
   * 
   * @param {MouseEvent} event - Événement de double-clic
   * 
   * @returns {void} - Ne retourne rien
   */
  public onDoubleClick(event: MouseEvent): void {
    this.dbclick.emit(event);
  }

  /**
   * Méthode onMouseDown
   * 
   * Gère l'événement de clic maintenu 
   * sur le bouton
   * 
   * @access public
   * @memberof ButtonComponent
   * @since 1.0.0
   * 
   * @param {MouseEvent} event - Événement de clic maintenu
   * 
   * @returns {void} - Ne retourne rien
   */
  public onMouseDown(event: MouseEvent): void {
    this.mousedown.emit(event);
  }

  /**
   * Méthode onMouseUp
   * 
   * Gère l'événement de relâchement du clic
   * 
   * @access public
   * @memberof ButtonComponent
   * @since 1.0.0
   * 
   * @param {MouseEvent} event - Événement de relâchement du clic
   * 
   * @returns {void} - Ne retourne rien
   */
  public onMouseUp(event: MouseEvent): void {
    this.mousedown.emit(event);
  }

  /**
   * Méthode onFocus
   * 
   * Gère l'événement de focus sur le bouton
   * 
   * @access public
   * @memberof ButtonComponent
   * @since 1.0.0
   * 
   * @param {FocusEvent} event - Événement de focus
   * 
   * @returns {void} - Ne retourne rien
   */
  public onFocus(event: FocusEvent): void {
    this.focus.emit(event);
  }

  /**
   * Méthode onBlur
   * 
   * Gère l'événement de perte de focus sur le bouton
   * 
   * @access public
   * @memberof ButtonComponent
   * @since 1.0.0
   * 
   * @param {FocusEvent} event - Événement de perte de focus
   * 
   * @returns {void} - Ne retourne rien
   */
  public onBlur(event: FocusEvent): void {
    this.blur.emit(event);
  }

  /**
   * Méthode onContextMenu
   * 
   * Gère l'événement du menu contextuel
   * 
   * @access public
   * @memberof ButtonComponent
   * @since 1.0.0
   * 
   * @param {MouseEvent} event - Événement du menu contextuel
   * 
   * @returns {void} - Ne retourne rien
   */
  public onContextMenu(event: MouseEvent): void {
    this.contextMenu.emit(event);
  }

  /**
   * Méthode onKeyDown
   * 
   * Gère l'événement de pression d'une touche
   * du clavier sur le bouton
   * 
   * @access public
   * @memberof ButtonComponent
   * @since 1.0.0
   * 
   * @param {KeyboardEvent} event - Événement de pression d'une touche
   * 
   * @returns {void} - Ne retourne rien
   */
  public onKeyDown(event: KeyboardEvent): void {
    this.keydown.emit(event);
  }

  /**
   * Méthode onKeyUp
   * 
   * Gère l'événement de relâchement d'une touche
   * du clavier sur le bouton
   * 
   * @access public
   * @memberof ButtonComponent
   * @since 1.0.0
   * 
   * @param {KeyboardEvent} event - Événement de relâchement d'une touche
   * 
   * @returns {void} - Ne retourne rien
   */
  public onKeyUp(event: KeyboardEvent): void {
    this.keyup.emit(event);
  }
  //#endregion
}
