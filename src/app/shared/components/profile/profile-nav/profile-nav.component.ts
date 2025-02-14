import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, inject, input, InputSignal, signal, WritableSignal } from '@angular/core';
import { User } from '@app/core/models/user.model';
import { logout } from '@app/core/stores/auth/auth.actions';
import { Store } from '@ngrx/store';
import { AnimationTiming, AppAnimations } from '@shared/animations/app.animations';

@Component({
  selector: 'app-profile-nav',
  standalone: false,
  templateUrl: './profile-nav.component.html',
  styleUrl: './profile-nav.component.scss',
  animations: [
    trigger('popAnimation', [
      transition(':enter', [
        useAnimation(AppAnimations.popIn, {
          params: { 
            timing: AnimationTiming.FAST,
            origin: 'top' 
          },
        }),
      ]),
      transition(':leave', [
        useAnimation(AppAnimations.popOut, {
          params: { 
            timing: AnimationTiming.FAST,
            origin: 'top'
          },
        }),
      ]),
    ]),
  ],
})
export class ProfileNavComponent {
  //#region Propriétés
  /**
   * Propriété open
   * @readonly
   * 
   * État d'ouverture du profil
   * 
   * @access public
   * @memberof ProfileNavComponent
   * @since 1.0.0
   * 
   * @type {WritableSignal<boolean>} open
   */
  public readonly open: WritableSignal<boolean> = 
    signal<boolean>(false);

  /**
   * Propriété user
   * @readonly
   * 
   * Utilisateur connecté
   * 
   * @access public
   * @memberof ProfileNavComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<User>} user
   */
  public readonly user: InputSignal<User> =
    input.required<User>();

  /**
   * Propriété store
   * @readonly
   * 
   * Store de l'application
   * 
   * @access private
   * @memberof ProfileNavComponent
   * @since 1.0.0
   * 
   * @type {Store} store
   */
  private readonly store: Store =
    inject<Store>(Store);
  //#endregion

  //#region Méthodes
  /**
   * Méthode logout
   * 
   * Déconnecte l'utilisateur
   * 
   * @access public
   * @memberof ProfileNavComponent
   * @since 1.0.0
   * 
   * @returns {void} - Ne retourne rien
   */
  public logout(): void {
    this.store.dispatch(logout());
  }

  /**
   * Méthode toggle
   * 
   * Bascule l'état d'ouverture du profil
   * 
   * @access public
   * @memberof ProfileNavComponent
   * @since 1.0.0
   * 
   * @returns {void} - Ne retourne rien
   */
  public toggle(): void {
    this.open.update((value: boolean) => !value);
  }

  /**
   * Méthode show
   * 
   * Affiche le profil
   * 
   * @access public
   * @memberof ProfileNavComponent
   * @since 1.0.0
   * 
   * @returns {void} - Ne retourne rien
   */
  public show(): void {
    this.open.set(true);
  }

  /**
   * Méthode hide
   * 
   * Masque le profil
   * 
   * @access public
   * @memberof ProfileNavComponent
   * @since 1.0.0
   * 
   * @returns {void} - Ne retourne rien
   */
  public hide(): void {
    this.open.set(false);
  }


  //#endregion
}
