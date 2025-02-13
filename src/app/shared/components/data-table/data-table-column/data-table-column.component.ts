import { Component, contentChild, input, InputSignal, model, ModelSignal, Signal } from '@angular/core';
import { DataTableCellDirective, DataTableFooterCellDirective, DataTableHeaderCellDirective } from '@shared/directives/data-table.directive';
import { ColumnSortDirection } from '../data-table.component';

@Component({
  selector: 'app-data-table-column',
  templateUrl: './data-table-column.component.html',
  standalone: false,
  styleUrl: './data-table-column.component.scss'
})
export class DataTableColumnComponent {
  //#region Propriétés
  /**
   * Propriété name
   * @readonly
   * 
   * Nom de la colonne
   * 
   * @access public
   * @memberof DataTableColumnComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<string>} - Nom de la colonne
   */
  public readonly name: InputSignal<string> = 
    input.required<string>();

  /**
   * Propriété sortable
   * @readonly
   * 
   * Colonne triable
   * 
   * @access public
   * @memberof DataTableColumnComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<boolean>} - Colonne triable
   */
  public readonly sortable: InputSignal<boolean> = 
    input<boolean>(false);

  /**
   * Propriété sticky
   * @readonly
   * 
   * Colonne collante
   * 
   * @access public
   * @memberof DataTableColumnComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<boolean>} - Colonne collante
   */
  public readonly sticky: InputSignal<boolean> = 
    input<boolean>(false);

  /**
   * Propriété stickyEnd
   * @readonly
   * 
   * Colonne collante à la fin
   * 
   * @access public
   * @memberof DataTableColumnComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<boolean>} - Colonne collante à la fin
   */
  public readonly stickyEnd: InputSignal<boolean> = 
    input<boolean>(false);

  /**
   * Propriété sortDirection
   * @readonly
   * 
   * Direction de tri de la colonne
   * 
   * @access public
   * @memberof DataTableColumnComponent
   * @since 1.0.0
   * 
   * @type {ModelSignal<ColumnSortDirection>} - Direction de tri de la colonne
   */
  public readonly sortDirection: ModelSignal<ColumnSortDirection> = 
    model<ColumnSortDirection>('unsorted');

  /**
   * Propriété header
   * @readonly
   * 
   * Entête de la colonne
   * 
   * @access public
   * @memberof DataTableColumnComponent
   * @since 1.0.0
   * 
   * @type {Signal<DataTableHeaderCellDirective | undefined>} - Entête de la colonne
   */
  public readonly header: Signal<DataTableHeaderCellDirective | undefined> = 
    contentChild<DataTableHeaderCellDirective>(DataTableHeaderCellDirective);

  /**
   * Propriété cell
   * @readonly
   * 
   * Cellule de la colonne
   * 
   * @access public
   * @memberof DataTableColumnComponent
   * @since 1.0.0
   * 
   * @type {Signal<DataTableCellDirective | undefined>} - Cellule de la colonne
   */
  public readonly cell: Signal<DataTableCellDirective | undefined> = 
    contentChild<DataTableCellDirective>(DataTableCellDirective);

  /**
   * Propriété footer
   * @readonly
   * 
   * Pied de la colonne
   * 
   * @access public
   * @memberof DataTableColumnComponent
   * @since 1.0.0
   * 
   * @type {Signal<DataTableFooterCellDirective | undefined>} - Pied de la colonne
   */
  public readonly footer: Signal<DataTableFooterCellDirective | undefined> = 
    contentChild<DataTableFooterCellDirective>(DataTableFooterCellDirective);
  //#endregion
}
