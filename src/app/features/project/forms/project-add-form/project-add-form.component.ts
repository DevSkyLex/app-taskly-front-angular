import { Component, inject, output, OutputEmitterRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { addProject } from '@app/core/stores/project/project.actions';
import { ProjectState } from '@app/core/stores/project/project.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-project-add-form',
  standalone: false,
  templateUrl: './project-add-form.component.html',
  styleUrl: './project-add-form.component.scss'
})
export class ProjectAddFormComponent {
  //#region Propriétés
  /**
   * Propriété formBuilder
   * @readonly
   * 
   * Constructeur de formulaire
   * 
   * @access public
   * @memberof ProjectListComponent
   * @since 1.0.0
   * 
   * @type {FormBuilder} formBuilder
   */
  public readonly formBuilder: FormBuilder =
    inject<FormBuilder>(FormBuilder);

  /**
   * Propriété addForm
   * @readonly
   * 
   * Formulaire d'ajout de projet
   * 
   * @access public
   * @memberof ProjectListComponent
   * @since 1.0.0
   * 
   * @type {FormGroup} addForm
   */
  public readonly form: FormGroup = this.formBuilder.group({
    name: this.formBuilder.control<string>('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50)
    ]),
    description: this.formBuilder.control<string>('', [
      Validators.required,
      Validators.minLength(16),
      Validators.maxLength(1024)
    ])
  });

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
   * Propriété submitted
   * 
   * Emetteur de sortie pour la soumission 
   * du formulaire
   * 
   * @access public
   * @memberof ProjectListComponent
   * @since 1.0.0
   * 
   * @type {OutputEmitterRef<void>} submit
   */
  public readonly submitted: OutputEmitterRef<void> = 
    output<void>();
  //#endregion

  //#region Méthodes
  public onSubmit(): void {
    if (this.form.invalid) return;

    this.store.dispatch(addProject({
      payload: {
        name: this.form.value.name,
        description: this.form.value.description
      }
    }));

    this.submitted.emit();

    this.form.reset();
  }
  //#endregion
}
