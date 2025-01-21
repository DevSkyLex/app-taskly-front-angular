import { Directive, model, ModelSignal, signal, WritableSignal } from '@angular/core';

@Directive({
  selector: '[appCollapsible]',
  exportAs: 'appCollapsible',
  standalone: false
})
export class CollapsibleDirective {
  //#region Propriétés
  /**
   * Propriété collapsed
   * 
   * Indique si le collapsible est ouvert
   * 
   * @access public
   * @memberof CollapsibleDirective
   * @since 1.0.0
   * 
   * @type {WModelSignal<boolean>} collapsed
   */
  public readonly collapsed: ModelSignal<boolean> = model<boolean>(true, {
    alias: 'collapsed',
  });
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
    this.collapsed.set(!this.collapsed());
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
    this.collapsed.set(true);
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
    this.collapsed.set(false);
  }
  //#endregion
}
