import { Directive, inject, TemplateRef } from "@angular/core";

@Directive({
  selector: "[appDataGridItem]",
  standalone: false,
})
export class DataGridItemDirective {
  //#region Propriétés
  /**
   * Propriété template
   * @readonly
   * 
   * Template de l'élement de grille
   * 
   * @access public
   * @memberof DataGridItemDirective
   * @since 1.0.0
   * 
   * @type {TemplateRef<any>} - Template de l'élement de grille
   */
  public readonly template: TemplateRef<any> = 
    inject<TemplateRef<any>>(TemplateRef);
  //#endregion
}