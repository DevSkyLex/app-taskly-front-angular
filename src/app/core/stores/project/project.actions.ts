import { JsonLdRequestOptions } from "@core/models/json-ld.model";
import { Project } from "@core/models/project.model";
import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";

/**
 * Action loadProjects
 * 
 * Charge la liste des projets
 * 
 * @type {ActionCreator} loadProjects
 */
export const loadProjects = createAction(
  '[Project] Load Projects',
  props<{ options?: JsonLdRequestOptions }>()
);

/**
 * Action loadProjectsSuccess
 * 
 * Charge la liste des projets avec succès
 * 
 * @type {ActionCreator} loadProjectsSuccess
 */
export const loadProjectsSuccess = createAction(
  '[Project] Load Projects Success',
  props<{ data: Project[] }>()
);

/**
 * Action loadProjectsFailure
 * 
 * Echec du chargement de la liste des projets
 * 
 * @type {ActionCreator} loadProjectsFailure
 */
export const loadProjectsFailure = createAction(
  '[Project] Load Projects Failure',
  props<{ error: string }>()
);

/**
 * Action loadProject
 * 
 * Charge un projet
 * 
 * @type {ActionCreator} loadProject
 */
export const loadProject = createAction(
  '[Project] Load Project',
  props<{ id: string }>()
);

/**
 * Action loadProjectSuccess
 * 
 * Charge un projet avec succès
 * 
 * @type {ActionCreator} loadProjectSuccess
 */
export const loadProjectSuccess = createAction(
  '[Project] Load Project Success',
  props<{ data: Project }>()
);

/**
 * Action loadProjectFailure
 * 
 * Echec du chargement d'un projet
 * 
 * @type {ActionCreator} loadProjectFailure
 */
export const loadProjectFailure = createAction(
  '[Project] Load Project Failure',
  props<{ error: string }>()
);

/**
 * Action addProject
 * 
 * Ajoute un projet
 * 
 * @type {ActionCreator} addProject
 */
export const addProject = createAction(
  '[Project] Add Project',
  props<Partial<Project>>()
);

/**
 * Action addProjectSuccess
 * 
 * Ajoute un projet avec succès
 * 
 * @type {ActionCreator} addProjectSuccess
 */
export const addProjectSuccess = createAction(
  '[Project] Add Project Success',
  props<{ data: Project }>()
);

/**
 * Action addProjectFailure
 * 
 * Echec de l'ajout d'un projet
 * 
 * @type {ActionCreator} addProjectFailure
 */
export const addProjectFailure = createAction(
  '[Project] Add Project Failure',
  props<{ error: string }>()
);

/**
 * Action updateProject
 * 
 * Met à jour un projet
 * 
 * @type {ActionCreator} updateProject
 */
export const updateProject = createAction(
  '[Project] Update Project',
  props<{ data: Update<Project> }>()
);

/**
 * Action updateProjectSuccess
 * 
 * Met à jour un projet avec succès
 * 
 * @type {ActionCreator} updateProjectSuccess
 */
export const updateProjectSuccess = createAction(
  '[Project] Update Project Success',
  props<{ data: Update<Project> }>()
);

/**
 * Action updateProjectFailure
 * 
 * Echec de la mise à jour d'un projet
 * 
 * @type {ActionCreator} updateProjectFailure
 */
export const updateProjectFailure = createAction(
  '[Project] Update Project Failure',
  props<{ error: string }>()
);

/**
 * Action deleteProject
 * 
 * Supprime un projet
 * 
 * @type {ActionCreator} deleteProject
 */
export const deleteProject = createAction(
  '[Project] Delete Project',
  props<{ id: string }>()
);

/**
 * Action deleteProjectSuccess
 * 
 * Supprime un projet avec succès
 * 
 * @type {ActionCreator} deleteProjectSuccess
 */
export const deleteProjectSuccess = createAction(
  '[Project] Delete Project Success',
  props<{ id: string }>()
);

/**
 * Action deleteProjectFailure
 * 
 * Echec de la suppression d'un projet
 * 
 * @type {ActionCreator} deleteProjectFailure
 */
export const deleteProjectFailure = createAction(
  '[Project] Delete Project Failure',
  props<{ error: string }>()
);

/**
 * Action clearProject
 * 
 * Vide le projet
 * 
 * @type {ActionCreator} clearProject
 */
export const clearProject = createAction(
  '[Project] Clear Project'
);

