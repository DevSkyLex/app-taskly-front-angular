import { Project } from '@core/models/project.model';
import { StoreOperation } from '@core/models/store.model';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';

/**
 * Interface ProjectState
 * @interface ProjectState
 * @extends EntityState<Project>
 * 
 * Définit l'état du store pour les projets
 * 
 * @memberof ProjectState
 * @version 1.0.0
 * 
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export interface ProjectState extends EntityState<Project> {
  //#region Propriétés
  /**
   * Propriété totalItems
   * 
   * Nombre total d'éléments
   * 
   * @memberof ProjectState
   * @since 1.0.0
   * 
   * @type {number} totalItems
   */
  totalItems: number;

  /**
   * Propriété operation
   * 
   * Opération en cours
   * 
   * @memberof ProjectState
   * @since 1.0.0
   * 
   * @type {StoreOperation} operation
   */
  operation: StoreOperation;
  //#endregion
}

/**
 * ProjectAdapter
 * 
 * Permet de gérer les projets 
 * dans le store
 * 
 * @see https://ngrx.io/guide/entity/adapter
 */
export const projectAdapter: EntityAdapter<Project> = createEntityAdapter<Project>({
  selectId: (project: Project) => project.id,
});

/**
 * InitialState 
 * 
 * Etat initial du store
 * 
 * @type {ProjectState} initialState
 */
export const initialState: ProjectState = projectAdapter.getInitialState({
  totalItems: 0,
  operation: {
    loading: false,
    error: null,
    success: null
  }
});