import { Directive, inject, TemplateRef } from "@angular/core";

@Directive({
  selector: "[appDataTableCell]",
  standalone: false,
})
export class DataTableCellDirective {
  //#region Propriétés
  /**
   * Propriété template
   * @readonly
   * 
   * Template de la cellule
   * 
   * @access public
   * @memberof DatatableCellDirective
   * @since 1.0.0
   * 
   * @type {TemplateRef<any>} - Template de la cellule
   */
  public readonly template: TemplateRef<any> = 
    inject<TemplateRef<any>>(TemplateRef);
  //#endregion
}

@Directive({
  selector: "[appDataTableFooterCell]",
  standalone: false,
})
export class DataTableFooterCellDirective {
  //#region Propriétés
  /**
   * Propriété template
   * @readonly
   * 
   * Template de la cellule
   * 
   * @access public
   * @memberof DatatableFooterCellDirective
   * @since 1.0.0
   * 
   * @type {TemplateRef<any>} - Template de la cellule
   */
  public readonly template: TemplateRef<any> = 
    inject<TemplateRef<any>>(TemplateRef);
  //#endregion
}

@Directive({
  selector: "[appDataTableHeaderCell]",
  standalone: false,
})
export class DataTableHeaderCellDirective {
  //#region Propriétés
  /**
   * Propriété template
   * @readonly
   * 
   * Template de la cellule
   * 
   * @access public
   * @memberof DatatableHeaderCellDirective
   * @since 1.0.0
   * 
   * @type {TemplateRef<any>} - Template de la cellule
   */
  public readonly template: TemplateRef<any> = 
    inject<TemplateRef<any>>(TemplateRef);
  //#endregion
}