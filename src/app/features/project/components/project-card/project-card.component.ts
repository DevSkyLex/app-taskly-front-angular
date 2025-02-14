import { Component, input, InputSignal } from '@angular/core';
import { Project } from '@app/core/models/project.model';

@Component({
  selector: 'app-project-card',
  standalone: false,
  
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent {
  //#region Propriétés
  /**
   * Propriété project
   * @readonly
   * 
   * Projet à afficher
   * 
   * @access public
   * @memberof ProjectCardComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<Project>} project
   */
  public readonly project: InputSignal<Project> =
    input.required<Project>();
  //#endregion
}
