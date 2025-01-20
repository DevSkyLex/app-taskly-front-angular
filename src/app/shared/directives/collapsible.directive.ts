import { Directive, signal, WritableSignal } from '@angular/core';

@Directive({
  selector: '[appCollapsible]',
  exportAs: 'appCollapsible',
  standalone: false
})
export class CollapsibleDirective {
  //#region Propriétés
  /**
   * Propriété expanded
   * 
   * Indique si le collapsible est ouvert
   * 
   * @access public
   * @memberof CollapsibleDirective
   * @since 1.0.0
   * 
   * @type {WritableSignal<boolean>} expanded
   */
  public readonly expanded: WritableSignal<boolean> = signal<boolean>(true);
  //#endregion

  //#region Méthodes
  /**
   * Méthode toggle
   * 
   * Bascule l'état du collapsible
   * 
   * @access public
   * @memberof CollapsibleDirective
   * @since 1.0.0
   * 
   * @return {void} - Ne retourne rien
   */
  public toggle(): void {
    this.expanded.set(!this.expanded());
  }

  /**
   * Méthode collapse
   * 
   * Ferme le collapsible
   * 
   * @access public
   * @memberof CollapsibleDirective
   * @since 1.0.0
   * 
   * @return {void} - Ne retourne rien
   */
  public collapse(): void {
    this.expanded.set(false);
  }

  /**
   * Méthode expand
   * 
   * Ouvre le collapsible
   * 
   * @access public
   * @memberof CollapsibleDirective
   * @since 1.0.0
   * 
   * @return {void} - Ne retourne rien
   */
  public expand(): void {
    this.expanded.set(true);
  }
  //#endregion
}
