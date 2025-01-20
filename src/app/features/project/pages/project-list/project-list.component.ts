import { Component, inject, OnInit } from '@angular/core';
import { ProjectState } from '@core/stores/project/project.state';
import { Store } from '@ngrx/store';
import * as ProjectActions from '@core/stores/project/project.actions';
import * as ProjectSelectors from '@core/stores/project/project.selectors';
import { Observable } from 'rxjs';
import { Project } from '@app/core/models/project.model';

@Component({
  selector: 'app-project-list',
  standalone: false,
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent implements OnInit {
  //#region Propriétés
  /**
   * Propriété store
   * @readonly
   * 
   * Récupère le store NGRX
   * 
   * @access public
   * @memberof ProjectListComponent
   * @since 1.0.0
   * 
   * @return {Store} store
   */
  public readonly store: Store<ProjectState> = 
    inject<Store<ProjectState>>(Store);

  /**
   * Propriété projects$
   * @readonly
   * 
   * Récupère les projets
   * 
   * @access public
   * @memberof ProjectListComponent
   * @since 1.0.0
   * 
   * @return {Observable<Project[]>} projects$
   */
  public readonly projects$: Observable<Project[]> = 
    this.store.select(ProjectSelectors.selectAllProjects);

  /**
   * Propriété loading$
   * @readonly
   * 
   * Récupère l'état de chargement
   * 
   * @access public
   * @memberof ProjectListComponent
   * @since 1.0.0
   * 
   * @return {Observable<boolean>} loading$
   */
  public readonly loading$: Observable<boolean> =
    this.store.select(ProjectSelectors.selectLoading);
  //#endregion

  //#region Méthodes
  public ngOnInit(): void {
    this.store.dispatch(ProjectActions.loadProjects({}));
  }
  //#endregion
}
