import { Component, Signal, TemplateRef, viewChild } from '@angular/core';

@Component({
  selector: 'app-dialog-body',
  standalone: false,
  templateUrl: './dialog-body.component.html',
})
export class DialogBodyComponent {
  //#region Propriétés
  /**
   * Propriété template
   * @readonly
   * 
   * Template de la boîte de dialogue
   * 
   * @access public
   * @memberof DialogBodyComponent
   * @since 1.0.0
   * 
   * @type {Signal<TemplateRef<any>>} template
   */
  public readonly template: Signal<TemplateRef<any>> = 
    viewChild.required<TemplateRef<any>>(TemplateRef);
  //#endregion
}
