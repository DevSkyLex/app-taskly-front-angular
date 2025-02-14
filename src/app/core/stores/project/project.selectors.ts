import {
  createFeatureSelector,
  createSelector,
  DefaultProjectorFn,
  MemoizedSelector,
} from '@ngrx/store';
import {
  ProjectState,
  projectAdapter,
} from '@core/stores/project/project.state';

/**
 * Sélecteur selectProjectState
 *
 * Sélectionne l'état du store des projets
 *
 * @type {MemoizedSelector<object, ProjectState, DefaultProjectorFn<ProjectState>>} selectProjectState
 */
export const selectProjectState: MemoizedSelector<
  object,
  ProjectState,
  DefaultProjectorFn<ProjectState>
> = createFeatureSelector<ProjectState>('project');

/**
 * Sélecteurs EntityAdapter
 *
 * Permet de gérer les projets dans le store
 *
 * @type {EntityAdapter<Project>} projectAdapter
 */
export const {
  selectIds: selectProjectIds,
  selectEntities: selectProjectEntities,
  selectAll: selectAllProjects,
} = projectAdapter.getSelectors(selectProjectState);

/**
 * Sélecteur selectProject
 * 
 * Sélectionne un projet
 * 
 * @param {string} id - Identifiant du projet
 * 
 * @type {MemoizedSelector<object, Project, (s1: ProjectState) => Project>} selectProject
 */
export const selectProject = (id: string) =>
  createSelector(selectProjectEntities, (entities) => entities[id]);

/**
 * Sélecteur selectLoading
 *
 * Sélectionne l'état de chargement
 *
 * @type {MemoizedSelector<
 *  object,
 *  boolean,
 *  (s1: ProjectState) => boolean
 * >} selectLoading
 */
export const selectLoading: MemoizedSelector<
  object,
  boolean,
  (s1: ProjectState) => boolean
> = createSelector(
  selectProjectState,
  (state: ProjectState) => state.operation.loading
);

/**
 * Sélecteur selectError
 *
 * Sélectionne l'erreur
 *
 * @type {MemoizedSelector<object, string | null, (s1: ProjectState) => string | null>} selectError
 */
export const selectError: MemoizedSelector<
  object,
  string | null,
  (s1: ProjectState) => string | null
> = createSelector(
  selectProjectState,
  (state: ProjectState) => state.operation.error
);

/**
 * Sélecteur selectSuccess
 *
 * Sélectionne le succès
 *
 * @type {MemoizedSelector<object, string | null, (s1: ProjectState) => string | null>} selectSuccess
 */
export const selectSuccess: MemoizedSelector<
  object,
  string | null,
  (s1: ProjectState) => string | null
> = createSelector(
  selectProjectState,
  (state: ProjectState) => state.operation.success
);

export const selectProjectTotal: MemoizedSelector<
  object,
  number,
  (s1: ProjectState) => number
> = createSelector(
  selectProjectState,
  (state: ProjectState) => state.total
);
