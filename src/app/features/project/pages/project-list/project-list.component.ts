import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProjectState } from '@core/stores/project/project.state';
import { Store } from '@ngrx/store';
import * as ProjectActions from '@core/stores/project/project.actions';
import * as ProjectSelectors from '@core/stores/project/project.selectors';
import { Observable } from 'rxjs';
import { Project } from '@app/core/models/project.model';
import { loadProjects } from '@core/stores/project/project.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-list',
  standalone: false,
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent implements OnInit {
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

  /**
   * Propriété projectsCount$
   * @readonly
   * 
   * Récupère le nombre de projets
   * 
   * @access public
   * @memberof ProjectListComponent
   * @since 1.0.0
   * 
   * @return {Observable<number>} projectsCount$
   */
  public readonly projectsCount$: Observable<number> =
    this.store.select(ProjectSelectors.selectProjectTotal);

    /**
   * Propriété page
   * @readonly
   *
   * Page courante
   *
   * @access public
   * @memberof MainDashboardComponent
   * @since 1.0.0
   *
   * @type {WritableSignal<number>} page
   */
    public readonly page: WritableSignal<number> = 
    signal<number>(1);

  /**
   * Propriété pageSize
   * @readonly
   *
   * Taille de la page
   *
   * @access public
   * @memberof MainDashboardComponent
   * @since 1.0.0
   *
   * @type {WritableSignal<number>} pageSize
   */
  public readonly pageSize: WritableSignal<number> = 
    signal<number>(10);
  //#endregion

  //#region Méthodes
  public ngOnInit(): void {
    this.loadProjects();
  }

  public loadProjects(): void {
    this.store.dispatch(loadProjects({
      pagination: {
        page: this.page(),
        itemsPerPage: this.pageSize()
      }
    }));
  }

  public onPageChange(page: number): void {
    this.loadProjects();
  }

  public onPageSizeChange(pageSize: number): void {
    this.loadProjects();
  }
}
