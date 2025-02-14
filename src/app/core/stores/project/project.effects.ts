import { inject, Injectable } from '@angular/core';
import { ProjectService } from '@app/core/services/api/project.service';
import {
  Actions,
  createEffect,
  CreateEffectMetadata,
  ofType,
} from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, map, mergeMap, Observable, of, switchMap } from 'rxjs';
import * as ProjectActions from '@core/stores/project/project.actions';

@Injectable()
export class ProjectEffects {
  //#region Propriétés
  /**
   * Propriété actions$
   * @readonly
   *
   * Actions
   *
   * @access private
   * @memberof ProjectEffects
   * @since 1.0.0
   *
   * @type {Actions} actions$
   */
  private readonly actions$: Actions = inject<Actions>(Actions);

  /**
   * Propriété projectService
   * @readonly
   *
   * Service des projets
   *
   * @access private
   * @memberof ProjectEffects
   * @since 1.0.0
   *
   * @type {ProjectService} projectService
   */
  private readonly projectService: ProjectService =
    inject<ProjectService>(ProjectService);
  //#endregion

  //#region Méthode
  /**
   * Méthode loadProjects$ (effet)
   *
   * Charge la liste des projets
   *
   * @access public
   * @memberof ProjectEffects
   * @since 1.0.0
   *
   * @type {Observable<Action>} loadProjects$
   */
  public loadProjects$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.loadProjects),
      switchMap((action) =>
        this.projectService.findAll(action.options).pipe(
          map((data) => ProjectActions.loadProjectsSuccess({ 
            data: data.member,
            total: data.totalItems
          })),
          catchError((error) =>
            of(
              ProjectActions.loadProjectsFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );

  /**
   * Méthode loadProjectsSuccess$ (effet)
   *
   * Charge la liste des projets
   *
   * @access public
   * @memberof ProjectEffects
   * @since 1.0.0
   *
   * @type {Observable<Action>} loadProjectsSuccess$
   */
  public loadProjectsSuccess$: Observable<Action> = createEffect(
    () => this.actions$.pipe(ofType(ProjectActions.loadProjectsSuccess)),
    { dispatch: false }
  );

  /**
   * Méthode loadProjectsFailure$ (effet)
   *
   * Charge la liste des projets
   *
   * @access public
   * @memberof ProjectEffects
   * @since 1.0.0
   *
   * @type {Observable<Action>} loadProjectsFailure$
   */
  public loadProjectsFailure$: Observable<Action> = createEffect(
    () => this.actions$.pipe(ofType(ProjectActions.loadProjectsFailure)),
    { dispatch: false }
  );

  /**
   * Méthode loadProject$ (effet)
   * 
   * Charge un projet
   * 
   * @access public
   * @memberof ProjectEffects
   * @since 1.0.0
   * 
   * @type {Observable<Action>} loadProject$
   */
  public loadProject$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.loadProject),
      mergeMap((action) =>
        this.projectService.find(action.id).pipe(
          map((data) => ProjectActions.loadProjectSuccess({ data: data })),
          catchError((error) =>
            of(
              ProjectActions.loadProjectFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );

  /**
   * Méthode loadProjectSuccess$ (effet)
   * 
   * Charge un projet
   * 
   * @access public
   * @memberof ProjectEffects
   * @since 1.0.0
   * 
   * @type {Observable<Action>} loadProjectSuccess$
   */
  public loadProjectSuccess$: Observable<Action> = createEffect(
    () => this.actions$.pipe(ofType(ProjectActions.loadProjectSuccess)),
    { dispatch: false }
  );

  /**
   * Méthode loadProjectFailure$ (effet)
   * 
   * Charge un projet
   * 
   * @access public
   * @memberof ProjectEffects
   * @since 1.0.0
   * 
   * @type {Observable<Action>} loadProjectFailure$
   */
  public loadProjectFailure$: Observable<Action> = createEffect(
    () => this.actions$.pipe(ofType(ProjectActions.loadProjectFailure)),
    { dispatch: false }
  );

  /**
   * Méthode addProject$ (effet)
   * 
   * Ajoute un projet
   * 
   * @access public
   * @memberof ProjectEffects
   * @since 1.0.0
   * 
   * @type {Observable<Action>} addProject$
   */
  public addProject$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.addProject),
      mergeMap((action) =>
        this.projectService.create(action.payload).pipe(
          map((data) => ProjectActions.addProjectSuccess({ data: data })),
          catchError((error) =>
            of(
              ProjectActions.addProjectFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );

  /**
   * Méthode addProjectSuccess$ (effet)
   * 
   * Ajoute un projet
   * 
   * @access public
   * @memberof ProjectEffects
   * @since 1.0.0
   * 
   * @type {Observable<Action>} addProjectSuccess$
   */
  public addProjectSuccess$: Observable<Action> = createEffect(
    () => this.actions$.pipe(ofType(ProjectActions.addProjectSuccess)),
    { dispatch: false }
  );

  /**
   * Méthode addProjectFailure$ (effet)
   * 
   * Ajoute un projet
   * 
   * @access public
   * @memberof ProjectEffects
   * @since 1.0.0
   * 
   * @type {Observable<Action>} addProjectFailure$
   */
  public addProjectFailure$: Observable<Action> = createEffect(
    () => this.actions$.pipe(ofType(ProjectActions.addProjectFailure)),
    { dispatch: false }
  );

  /**
   * Méthode updateProject$ (effet)
   * 
   * Met à jour un projet
   * 
   * @access public
   * @memberof ProjectEffects
   * @since 1.0.0
   * 
   * @type {Observable<Action>} updateProject$
   */
  public updateProject$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.updateProject),
      mergeMap((action) =>
        this.projectService.update(action.data.id, action.data.changes).pipe(
          map(() => ProjectActions.updateProjectSuccess(action)),
          catchError((error) =>
            of(
              ProjectActions.updateProjectFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );

  /**
   * Méthode updateProjectSuccess$ (effet)
   * 
   * Met à jour un projet
   * 
   * @access public
   * @memberof ProjectEffects
   * @since 1.0.0
   * 
   * @type {Observable<Action>} updateProjectSuccess$
   */
  public updateProjectSuccess$: Observable<Action> = createEffect(
    () => this.actions$.pipe(ofType(ProjectActions.updateProjectSuccess)),
    { dispatch: false }
  );

  /**
   * Méthode updateProjectFailure$ (effet)
   * 
   * Met à jour un projet
   * 
   * @access public
   * @memberof ProjectEffects
   * @since 1.0.0
   * 
   * @type {Observable<Action>} updateProjectFailure$
   */
  public updateProjectFailure$: Observable<Action> = createEffect(
    () => this.actions$.pipe(ofType(ProjectActions.updateProjectFailure)),
    { dispatch: false }
  );

  /**
   * Méthode deleteProject$ (effet)
   * 
   * Supprime un projet
   * 
   * @access public
   * @memberof ProjectEffects
   * @since 1.0.0
   * 
   * @type {Observable<Action>} deleteProject$
   */
  public deleteProject$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.deleteProject),
      mergeMap((action) =>
        this.projectService.delete(action.id).pipe(
          map(() => ProjectActions.deleteProjectSuccess({ id: action.id })),
          catchError((error) =>
            of(
              ProjectActions.deleteProjectFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );

  /**
   * Méthode deleteProjectSuccess$ (effet)
   * 
   * Supprime un projet
   * 
   * @access public
   * @memberof ProjectEffects
   * @since 1.0.0
   * 
   * @type {Observable<Action>} deleteProjectSuccess$
   */
  public deleteProjectSuccess$: Observable<Action> = createEffect(
    () => this.actions$.pipe(ofType(ProjectActions.deleteProjectSuccess)),
    { dispatch: false }
  );

  /**
   * Méthode deleteProjectFailure$ (effet)
   * 
   * Supprime un projet
   * 
   * @access public
   * @memberof ProjectEffects
   * @since 1.0.0
   * 
   * @type {Observable<Action>} deleteProjectFailure$
   */
  public deleteProjectFailure$: Observable<Action> = createEffect(
    () => this.actions$.pipe(ofType(ProjectActions.deleteProjectFailure)),
    { dispatch: false }
  );
  //#endregion
}
