import { transition, trigger, useAnimation } from '@angular/animations';
import { OverlayModule } from '@angular/cdk/overlay';
import { Component, signal, WritableSignal } from '@angular/core';
import { AnimationTiming, AppAnimations } from '@shared/animations/app.animations';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-main-layout-header',
  imports: [SharedModule, OverlayModule],
  templateUrl: './main-layout-header.component.html',
  styleUrl: './main-layout-header.component.scss',
  animations: [
    trigger('profilePopAnimation', [
      transition(':enter', [
        useAnimation(AppAnimations.popIn, {
          params: { timing: AnimationTiming.FAST }
        })
      ]),
      transition(':leave', [
        useAnimation(AppAnimations.popOut, {
          params: { timing: AnimationTiming.FAST }
        })
      ]),
    ])
  ]
})
export class MainLayoutHeaderComponent {
  //#region Propriétés
  /**
   * Propriété profileOpen
   * @readonly
   * 
   * État d'ouverture du profil
   * 
   * @access public
   * @memberof MainLayoutHeaderComponent
   * @since 1.0.0
   * 
   * @type {WritableSignal<boolean>} profileOpen
   */
  public readonly profileOpen: WritableSignal<boolean> = 
    signal<boolean>(false);
  //#endregion

  //#region Méthodes
  /**
   * Méthode toggleProfile
   * 
   * Bascule l'état d'ouverture du profil
   * 
   * @access public
   * @memberof MainLayoutHeaderComponent
   * @since 1.0.0
   * 
   * @returns {void} - Ne retourne rien
   */
  public toggleProfile(): void {
    this.profileOpen.set(!this.profileOpen());
  }

  /**
   * Méthode closeProfile
   * 
   * Ferme le profil
   * 
   * @access public
   * @memberof MainLayoutHeaderComponent
   * @since 1.0.0
   * 
   * @returns {void} - Ne retourne rien
   */
  public closeProfile(): void {
    this.profileOpen.set(false);
  }

  /**
   * Méthode openProfile
   * 
   * Ouvre le profil
   * 
   * @access public
   * @memberof MainLayoutHeaderComponent
   * @since 1.0.0
   * 
   * @returns {void} - Ne retourne rien
   */
  public openProfile(): void {
    this.profileOpen.set(true);
  }
  //#endregion
}
