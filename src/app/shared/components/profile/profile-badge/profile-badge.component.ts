import { Component, computed, input, InputSignal, Signal } from '@angular/core';
import { User } from '@app/core/models/user.model';

@Component({
  selector: 'app-profile-badge',
  standalone: false,
  templateUrl: './profile-badge.component.html',
  styleUrl: './profile-badge.component.scss'
})
export class ProfileBadgeComponent {
  //#region Propriétés
  /**
   * Propriété user
   * @readonly
   * 
   * Utilisateur connecté
   * 
   * @access public
   * @memberof ProfileBadgeComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<User>} user
   */
  public readonly user: InputSignal<User> =
    input.required<User>();

  /**
   * Propriété initials
   * @readonly
   * 
   * Initiales de l'utilisateur
   * 
   * @access public
   * @memberof ProfileBadgeComponent
   * @since 1.0.0
   * 
   * @type {Signal<string>} initials
   */
  public readonly initials: Signal<string> = computed(() => {
    const user: User = this.user();
    return user.firstName.charAt(0) + user.lastName.charAt(0);
  });

  /**
   * Propriété fullName
   * @readonly
   * 
   * Nom complet de l'utilisateur
   * 
   * @access public
   * @memberof ProfileBadgeComponent
   * @since 1.0.0
   * 
   * @type {Signal<string>} fullName
   */
  public readonly fullName: Signal<string> = computed(() => {
    const user: User = this.user();
    return `${user.firstName} ${user.lastName}`;
  });
  //#endregion
}
