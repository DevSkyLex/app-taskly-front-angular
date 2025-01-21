import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-avatar',
  standalone: false,
  
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss'
})
export class AvatarComponent {
  //#region Propriétés
  /**
   * Propriété src
   * @readonly
   * 
   * Source de l'image
   * 
   * @access public
   * @memberof AvatarComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<string | null>} src
   */
  public readonly src: InputSignal<string | null> = 
    input<string | null>(null);

  /**
   * Propriété alt
   * @readonly
   * 
   * Texte alternatif de l'image
   * 
   * @access public
   * @memberof AvatarComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<string>} alt
   */
  public readonly alt: InputSignal<string> =
    input<string>('');

  /**
   * Propriété size
   * @readonly
   * 
   * Taille de l'image
   * 
   * @access public
   * @memberof AvatarComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<number>} size
   */
  public readonly size: InputSignal<number> =
    input<number>(32);

  /**
   * Propriété fallback
   * @readonly
   * 
   * Source de l'image de secours
   * 
   * @access public
   * @memberof AvatarComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<string | null>} fallback
   */
  public readonly fallback: InputSignal<string | null> =
    input<string | null>(null);
  //#endregion
}
