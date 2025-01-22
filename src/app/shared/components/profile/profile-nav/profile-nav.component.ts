import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, input, InputSignal, signal, WritableSignal } from '@angular/core';
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
   * Propriété avatar
   * @readonly
   * 
   * Source de l'avatar
   * 
   * @access public
   * @memberof ProfileNavComponent
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
   * @memberof ProfileNavComponent
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
   * @memberof ProfileNavComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<string | null>} email
   */
  public readonly email: InputSignal<string | null> =
    input<string | null>(null);
  //#endregion

  //#region Méthodes
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
