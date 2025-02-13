import { Component, Signal, TemplateRef, viewChild } from '@angular/core';

@Component({
  selector: 'app-dialog-footer',
  standalone: false,
  templateUrl: './dialog-footer.component.html',
})
export class DialogFooterComponent {
  //#region Propriétés
  /**
   * Propriété template
   * @readonly
   * 
   * Template de la boîte de dialogue
   * 
   * @access public
   * @memberof DialogFooterComponent
   * @since 1.0.0
   * 
   * @type {Signal<TemplateRef<any>>} template
   */
  public readonly template: Signal<TemplateRef<any>> = 
    viewChild.required<TemplateRef<any>>(TemplateRef);
  //#endregion
}
