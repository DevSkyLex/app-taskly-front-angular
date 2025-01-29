import { Component, Signal, TemplateRef, viewChild } from '@angular/core';

@Component({
  selector: 'app-card-footer',
  standalone: false,
  templateUrl: './card-footer.component.html',
})
export class CardFooterComponent {
  //#region Propriétés
  /**
   * Propriété template
   * @readonly
   * 
   * Template du composant card-footer
   * 
   * @access public
   * @memberof CardFooterComponent
   * @since 1.0.0
   * 
   * @type {Signal<TemplateRef<any>>} template
   */
  public readonly template: Signal<TemplateRef<any>> = 
    viewChild.required<TemplateRef<any>>(TemplateRef);
  //#endregion
}
