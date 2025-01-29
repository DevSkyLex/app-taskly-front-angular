import { Component, Signal, TemplateRef, viewChild } from '@angular/core';

@Component({
  selector: 'app-card-body',
  standalone: false,
  templateUrl: './card-body.component.html',
})
export class CardBodyComponent {
  //#region Propriétés
  /**
   * Propriété template
   * @readonly
   * 
   * Template du composant card-body
   * 
   * @access public
   * @memberof CardBodyComponent
   * @since 1.0.0
   * 
   * @type {Signal<TemplateRef<any>>} template
   */
  public readonly template: Signal<TemplateRef<any>> = 
    viewChild.required<TemplateRef<any>>(TemplateRef);
  //#endregion
}
