import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { CdkColumnDef, CdkTable } from '@angular/cdk/table';
import { Component, computed, contentChildren, input, InputSignal, model, ModelSignal, OnInit, output, OutputEmitterRef, signal, Signal, viewChild, WritableSignal } from '@angular/core';
import { DataTableColumnComponent } from './data-table-column/data-table-column.component';
import { Observable } from 'rxjs';

export type ColumnSortDirection = 'asc' | 'desc' | 'unsorted';

export type Column = {
  name: string;
  sortDirection: ColumnSortDirection;
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  standalone: false,
  styleUrl: './data-table.component.scss',
})
export class DataTableComponent<T extends Record<string, any>> implements OnInit {
  //#region Propriétés
  /**
   * Propriété dataSource
   * @readonly
   * 
   * Données du tableau
   * 
   * @access public
   * @memberof DatatableComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<Observable<T[]>>} data
   */
  public readonly dataSource: InputSignal<Observable<T[]>> = input.required<Observable<T[]>>();

  /**
   * Propriété refresh
   * @readonly
   * 
   * Événement émis lors du rafraîchissement du tableau
   * 
   * @access public
   * @memberof DatatableComponent
   * @since 1.0.0
   * 
   * @type {OutputEmitterRef<void>} refresh
   */
  public readonly refresh: OutputEmitterRef<void> = output<void>();

  /**
   * Propriété pageSize
   * @readonly
   * 
   * Taille de la page
   * 
   * @access public
   * @memberof DatatableComponent
   * @since 1.0.0
   * 
   * @type {ModelSignal<number>} pageSize
   */
  public readonly pageSize: ModelSignal<number> = model<number>(10);

  /**
   * Propriété page
   * @readonly
   * 
   * Page courante
   * 
   * @access public
   * @memberof DatatableComponent
   * @since 1.0.0
   * 
   * @type {ModelSignal<number>} currentPage
   */
  public readonly page: ModelSignal<number> = model<number>(1);

  /**
   * Propriété totalItems
   * @readonly
   * 
   * Nombre total d'éléments
   * 
   * @access public
   * @memberof DatatableComponent
   * @since 1.0.0
   * 
   * @type {ModelSignal<number>} totalItems
   */
  public readonly totalItems: ModelSignal<number> = model<number>(0);

  /**
   * Propriété rowClick
   * @readonly
   * 
   * Événement émis lors du clic sur une ligne
   * 
   * @access public
   * @memberof DatatableComponent
   * @since 1.0.0
   * 
   * @type {OutputEmitterRef<T>} rowClick
   */
  public readonly rowClick: OutputEmitterRef<T> = output<T>();

  /**
   * Propriété selectionModel
   * @readonly
   * 
   * Sélection des lignes
   * 
   * @access public
   * @memberof DatatableComponent
   * @since 1.0.0
   * 
   * @type {SelectionModel<T>} selectionModel
   */
  public readonly selectionModel: SelectionModel<T> = new SelectionModel<T>(true, []);

  /**
   * Propriété selectionChange
   * @readonly
   * 
   * Sélection des lignes
   * 
   * @access public
   * @memberof DatatableComponent
   * @since 1.0.0
   * 
   * @type {OutputEmitterRef<T[]>} selection
   */
  public readonly selectionChange: OutputEmitterRef<T[]> = output<T[]>();

  /**
   * Propriété search
   * @readonly
   * 
   * Recherche dans le tableau
   * 
   * @access public
   * @memberof DatatableComponent
   * @since 1.0.0
   * 
   * @type {ModelSignal<string>} search
   */
  public readonly search: ModelSignal<string> = model<string>('');

  /**
   * Propriété columns
   * @readonly
   * 
   * Colonnes affichées
   * 
   * @access public
   * @memberof DatatableComponent
   * @since 1.0.0
   * 
   * @type {Signal<readonly DataTableColumnComponent[]>} columns
   */
  public readonly columns: Signal<readonly DataTableColumnComponent[]> = contentChildren<DataTableColumnComponent>(DataTableColumnComponent);

  /**
   * Propriété displayedColumns
   * @readonly
   * 
   * Colonnes affichées
   * 
   * @access public
   * @memberof DatatableComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<string[]>} displayedColumns
   */
  public readonly displayedColumns: InputSignal<string[]> = input<string[]>([]);

  /**
   * Propriété paginated
   * @readonly
   * 
   * Indique si le tableau est paginé
   * 
   * @access public
   * @memberof DatatableComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<boolean>} paginated
   */
  public readonly paginated: InputSignal<boolean> = input<boolean>(true);

  /**
   * Propriété headerClick
   * @readonly
   * 
   * Événement émis lors du clic sur l'en-tête 
   * d'une colonne.
   * 
   * Indique le nom de la colonne cliquée.
   * 
   * @access public
   * @memberof DatatableComponent
   * @since 1.0.0
   * 
   * @type {OutputEmitterRef<Column>} headerClick
   */
  public readonly headerClick: OutputEmitterRef<Column> = output<Column>(); 

  /**
   * Propriété footerClick
   * @readonly
   * 
   * Événement émis lors du clic sur le pied 
   * d'une colonne.
   * 
   * Indique le nom de la colonne cliquée.
   * 
   * @access public
   * @memberof DatatableComponent
   * @since 1.0.0
   * 
   * @type {OutputEmitterRef<Column>} footerClick
   */
  public readonly footerClick: OutputEmitterRef<Column> = output<Column>();

  /**
   * Propriété data
   * @readonly
   * 
   * Données du tableau
   * 
   * @access public
   * @memberof DatatableComponent
   * @since 1.0.0
   * 
   * @type {WritableSignal<T[]>} data
   */
  public readonly data: WritableSignal<T[]> = signal<T[]>([]);
  //#endregion

  //#region Méthodes
  /**
   * Méthode ngOnInit
   * 
   * Méthode du cycle de vie du composant appelée
   * après la création du composant.
   * 
   * @access public
   * @memberof DatatableComponent
   * @since 1.0.0
   * 
   * @return {void} - Ne retourne rien
   */
  public ngOnInit(): void {
    // Abonnement à la source de données
    this.dataSource().subscribe(data => this.data.set(data));

    // Abonnement à la sélection des lignes
    this.selectionModel.changed.subscribe(() => this.selectionChange.emit(this.selectionModel.selected));
  }

  /**
   * Méthode toggleSelection
   * 
   * Méthode permettant de basculer la sélection
   * 
   * @access public
   * @memberof DatatableComponent
   * @since 1.0.0
   * 
   * @param {T} row - Ligne à basculer
   * 
   * @return {void} - Ne retourne rien
   */
  public toggleSelection(row: T): void {
    this.selectionModel.toggle(row);
  }

  /**
   * Méthode toggleAllSelection
   * 
   * Méthode permettant de basculer la sélection
   * de toutes les lignes.
   * 
   * @access public
   * @memberof DatatableComponent
   * @since 1.0.0
   * 
   * @return {void} - Ne retourne rien
   */
  public toggleAllSelection(rows: T[]): void {
    this.isAllSelected(rows) ? 
      this.selectionModel.clear() : 
      this.selectionModel.select(...rows);
  }

  /**
   * Méthode isSelected
   * 
   * Méthode indiquant si une ligne est sélectionnée.
   * 
   * @access public
   * @memberof DatatableComponent
   * @since 1.0.0
   * 
   * @param {T} row - Ligne à tester
   * 
   * @return {boolean} - Retourne vrai si la ligne est sélectionnée, faux sinon
   */
  public isSelected(row: T): boolean {
    return this.selectionModel.isSelected(row);
  }

  /**
   * Méthode isAllSelected
   * 
   * Méthode indiquant si toutes les lignes sont sélectionnées.
   * 
   * @access public
   * @memberof DatatableComponent
   * @since 1.0.0
   * 
   * @param {T[]} rows - Lignes à tester
   * 
   * @return {boolean} - Retourne vrai si toutes les lignes sont sélectionnées, faux sinon
   */
  public isAllSelected(rows: T[]): boolean {
    const numSelected: number = this.selectionModel.selected.length;
    const numRows: number = rows.length;
    return numSelected === numRows;
  }

  /**
   * Méthode onHeaderClick
   * 
   * Méthode appelée lors du clic sur l'en-tête 
   * d'une colonne.
   * 
   * @access public
   * @memberof DatatableComponent
   * @since 1.0.0
   * 
   * @param {DatatableColumnComponent} column - Colonne cliquée
   * 
   * @return {void} - Ne retourne rien
   */
  public onHeaderClick(column: DataTableColumnComponent): void {
    if (column.sortable()) this.changeSortDirection(column);

    // Émission de l'événement headerClick
    this.headerClick.emit({
      name: column.name(),
      sortDirection: column.sortDirection()
    });
  }

  /**
   * Méthode onFooterClick
   * 
   * Méthode appelée lors du clic sur le pied 
   * d'une colonne.
   * 
   * @access public
   * @memberof DatatableComponent
   * @since 1.0.0
   * 
   * @param {DatatableColumnComponent} column - Colonne cliquée
   * 
   * @return {void} - Ne retourne rien
   */
  public onFooterClick(column: DataTableColumnComponent): void {
    if (column.sortable()) this.changeSortDirection(column);

    // Émission de l'événement footerClick
    this.footerClick.emit({
      name: column.name(),
      sortDirection: column.sortDirection()
    });
  }

  /**
   * Méthode changeSortDirection
   * 
   * Méthode permettant de changer la direction 
   * de tri d'une colonne.
   * 
   * @access public
   * @memberof DatatableComponent
   * @since 1.0.0
   * 
   * @param {DatatableColumnComponent} column - Colonne à modifier
   * 
   * @return {void} - Ne retourne rien
   */
  public changeSortDirection(column: DataTableColumnComponent): void {
    this.resetSortDirections(column);
    const currentDirection: ColumnSortDirection = column.sortDirection();
    const newDirection: ColumnSortDirection = currentDirection === 'asc' ? 'desc' : 'asc';
    column.sortDirection.set(newDirection);
  }

  /**
   * Méthode resetSortDirections
   * 
   * Méthode permettant de réinitialiser la direction 
   * de tri de toutes les colonnes sauf une.
   * 
   * @access public
   * @memberof DatatableComponent
   * @since 1.0.0
   * 
   * @param {DatatableColumnComponent} excludeColumn - Colonne à exclure
   * 
   * @return {void} - Ne retourne rien
   */
  public resetSortDirections(excludeColumn: DataTableColumnComponent): void {
    this.columns().forEach(column => {
      if (column !== excludeColumn) column.sortDirection.set('unsorted');
    });
  }

  /**
   * Méthode onPageChange
   * 
   * Méthode appelée lors du changement de page.
   * 
   * @access public
   * @memberof DatatableComponent
   * @since 1.0.0
   * 
   * @param {number} page - Numéro de la page
   * 
   * @return {void} - Ne retourne rien
   */
  public onPageChange(page: number): void {
    this.selectionModel.clear();
  }

  /**
   * Méthode onRowClick
   * 
   * Méthode appelée lors du clic sur une ligne.
   * 
   * @access public
   * @memberof DatatableComponent
   * @since 1.0.0
   * 
   * @param {T} row - Ligne cliquée
   * 
   * @return {void} - Ne retourne rien
   */
  public onRowClick(row: T): void {
    this.rowClick.emit(row);
  }

  /**
   * Méthode onRefresh
   * 
   * Méthode appelée lors du rafraîchissement du 
   * tableau.
   * 
   * @access public
   * @memberof DatatableComponent
   * @since 1.0.0
   * 
   * @return {void} - Ne retourne rien
   */
  public onRefresh(): void {
    this.refresh.emit();
  }
  //#endregion
}
