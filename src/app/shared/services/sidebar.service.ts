import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';

type SidebarState = 'expanded' | 'collapsed';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  //#region Propriétés
  /**
   * Propriété open
   * @readonly
   * 
   * Signal d'ouverture du panneau latéral
   * 
   * @access private
   * @memberof SidebarService
   * @since 1.0.0
   * 
   * @type {WritableSignal<SidebarState>} open
   */
  private readonly state: WritableSignal<SidebarState> = 
    signal<SidebarState>('expanded');
  
  /**
   * Propriété collapsed
   * @readonly
   * 
   * Signal de panneau latéral fermé
   * 
   * @access public
   * @memberof SidebarService
   * @since 1.0.0
   * 
   * @type {Signal<boolean>} collapsed
   */
  public readonly collapsed: Signal<boolean> = computed(() => {
    return this.state() === 'collapsed';
  });

  /**
   * Propriété expanded
   * @readonly
   * 
   * Signal de panneau latéral ouvert
   * 
   * @access public
   * @memberof SidebarService
   * @since 1.0.0
   * 
   * @type {Signal<boolean>} expanded
   */
  public readonly expanded: Signal<boolean> = computed(() => {
    return this.state() === 'expanded';
  });
  //#endregion

  //#region Méthodes
  /**
   * Méthode toggle
   * 
   * Bascule l'état d'ouverture du panneau latéral
   * 
   * @access public
   * @memberof SidebarService
   * @since 1.0.0
   * 
   * @returns {void} - Ne retourne rien
   */
  public toggle(): void {
    this.state.update((state: SidebarState) =>
      state === 'expanded' ? 'collapsed' : 'expanded'
    );
  }

  /**
   * Méthode expand
   * 
   * Ouvre le panneau latéral
   * 
   * @access public
   * @memberof SidebarService
   * @since 1.0.0
   * 
   * @returns {void} - Ne retourne rien
   */
  public expand(): void {
    this.state.set('expanded');
  }

  /**
   * Méthode collapse
   * 
   * Ferme le panneau latéral
   * 
   * @access public
   * @memberof SidebarService
   * @since 1.0.0
   * 
   * @returns {void} - Ne retourne rien
   */
  public collapse(): void {
    this.state.set('collapsed');
  }
  //#endregion
}
