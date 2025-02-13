import { Component, contentChild, contentChildren, input, InputSignal, model, ModelSignal, OnInit, output, OutputEmitterRef, Signal, TemplateRef } from '@angular/core';
import { DataGridItemDirective } from '@app/shared/directives/data-grid.directive';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data-grid',
  standalone: false,
  
  templateUrl: './data-grid.component.html',
  styleUrl: './data-grid.component.scss'
})
export class DataGridComponent<T extends Record<string, any>> implements OnInit {
  //#region Propriétés
  /**
   * Propriété data
   * @readonly
   * 
   * Données à afficher dans la grille
   * 
   * @access public
   * @memberof DataGridComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<T[]>} data
   */
  public readonly data: InputSignal<T[]> = 
    input.required<T[]>();

  /**
   * Propriété refresh
   * @readonly
   * 
   * Rafraîchit la grille de 
   * données
   * 
   * @access public
   * @memberof DataGridComponent
   * @since 1.0.0
   * 
   * @type {OutputEmitterRef<void>} refresh
   */
  public readonly refresh: OutputEmitterRef<void> = 
    output<void>();

  /**
   * Propriété pageSize
   * @readonly
   * 
   * Taille de la page
   * 
   * @access public
   * @memberof DataGridComponent
   * @since 1.0.0
   * 
   * @type {ModelSignal<number>} pageSize
   */
  public readonly pageSize: ModelSignal<number> =
    model<number>(10);

  /**
   * Propriété page
   * @readonly
   * 
   * Numéro de la page courante
   * 
   * @access public
   * @memberof DataGridComponent
   * @since 1.0.0
   * 
   * @type {ModelSignal<number>} page
   */
  public readonly page: ModelSignal<number> =
    model<number>(1);

  /**
   * Propriété totalItems
   * @readonly
   * 
   * Nombre total d'éléments
   * 
   * @access public
   * @memberof DataGridComponent
   * @since 1.0.0
   * 
   * @type {ModelSignal<number>} totalItems
   */
  public readonly totalItems: ModelSignal<number> =
    model<number>(0);

  /**
   * Propriété itemClick
   * @readonly
   * 
   * Événement déclenché lorsqu'un élément est cliqué
   * 
   * @access public
   * @memberof DataGridComponent
   * @since 1.0.0
   * 
   * @type {OutputEmitterRef<T>} itemClick
   */
  public readonly itemClick: OutputEmitterRef<T> = 
    output<T>();

  /**
   * Propriété paginated
   * @readonly
   * 
   * Indique si la grille de données 
   * est paginée
   * 
   * @access public
   * @memberof DataGridComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<boolean>} paginated
   */
  public readonly paginated: InputSignal<boolean> =
    input<boolean>(false);

  /**
   * Propriété element
   * @readonly
   * 
   * Template des éléments de la grille
   * 
   * @access public
   * @memberof DataGridComponent
   * @since 1.0.0
   * 
   * @type {Signal<DataGridItemDirective>} element
   */
  public readonly element: Signal<DataGridItemDirective> = 
    contentChild.required<DataGridItemDirective>(DataGridItemDirective);
  //#endregion

  //#region Méthodes
  /**
   * Méthode ngOnInit
   * 
   * Méthode du cycle de vie du composant appelée après 
   * la construction du composant
   * 
   * @access public
   * @memberof DataGridComponent
   * @since 1.0.0
   * 
   * @return {void} - Ne retourne rien
   */
  public ngOnInit(): void {
    
  }

  /**
   * Méthode onRefresh
   * 
   * Rafraîchit la grille de données
   * 
   * @access public
   * @memberof DataGridComponent
   * @since 1.0.0
   * 
   * @return {void} - Ne retourne rien
   */
  public onRefresh(): void {
    this.refresh.emit();
  }
  //#endregion
}
