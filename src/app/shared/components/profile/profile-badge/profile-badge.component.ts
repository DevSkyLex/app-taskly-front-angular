import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-profile-badge',
  standalone: false,
  templateUrl: './profile-badge.component.html',
  styleUrl: './profile-badge.component.scss'
})
export class ProfileBadgeComponent {
  //#region Propriétés
  /**
   * Propriété avatar
   * @readonly
   * 
   * Source de l'avatar
   * 
   * @access public
   * @memberof ProfileBadgeComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<string | null>} avatar
   */
  public readonly avatar: InputSignal<string | null> =
    input<string | null>(null);

  /**
   * Propriété username
   * @readonly
   * 
   * Nom d'utilisateur
   * 
   * @access public
   * @memberof ProfileBadgeComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<string>} username
   */
  public readonly username: InputSignal<string> =
    input.required<string>();

  /**
   * Propriété email
   * @readonly
   * 
   * Adresse email
   * 
   * @access public
   * @memberof ProfileBadgeComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<string | null>} email
   */
  public readonly email: InputSignal<string | null> =
    input<string | null>(null);
  //#endregion
}
