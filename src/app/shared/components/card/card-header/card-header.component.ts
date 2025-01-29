import { Component, Signal, TemplateRef, viewChild } from '@angular/core';

@Component({
  selector: 'app-card-header',
  standalone: false,
  templateUrl: './card-header.component.html',
})
export class CardHeaderComponent {
  //#region Propriétés
  /**
   * Propriété template
   * @readonly
   * 
   * Template du composant card-header
   * 
   * @access public
   * @memberof CardHeaderComponent
   * @since 1.0.0
   * 
   * @type {Signal<TemplateRef<any>>} template
   */
  public readonly template: Signal<TemplateRef<any>> = 
    viewChild.required<TemplateRef<any>>(TemplateRef);
  //#endregion
}
