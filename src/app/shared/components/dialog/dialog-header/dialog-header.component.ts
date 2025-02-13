import { Component, Signal, TemplateRef, viewChild } from '@angular/core';

@Component({
  selector: 'app-dialog-header',
  standalone: false,
  templateUrl: './dialog-header.component.html',
})
export class DialogHeaderComponent {
  //#region Propriétés
  /**
   * Propriété template
   * @readonly
   * 
   * Template de la boîte de dialogue
   * 
   * @access public
   * @memberof DialogHeaderComponent
   * @since 1.0.0
   * 
   * @type {Signal<TemplateRef<any>>} template
   */
  public readonly template: Signal<TemplateRef<any>> = 
    viewChild.required<TemplateRef<any>>(TemplateRef);
  //#endregion
}
