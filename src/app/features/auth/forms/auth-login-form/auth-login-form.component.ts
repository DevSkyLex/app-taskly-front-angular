import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-login-form',
  standalone: false,
  
  templateUrl: './auth-login-form.component.html',
  styleUrl: './auth-login-form.component.scss'
})
export class AuthLoginFormComponent {
  //#region Propriétés
  /**
   * Propriété formBuilder
   * @readonly
   * 
   * Constructeur de formulaire
   * 
   * @access private
   * @memberof AuthLoginFormComponent
   * @since 1.0.0
   * 
   * @type {FormBuilder} formBuilder
   */
  private readonly formBuilder: FormBuilder = 
    inject<FormBuilder>(FormBuilder);

  /**
   * Propriété form
   * @readonly
   * 
   * Formulaire de connexion
   * 
   * @access public
   * @memberof AuthLoginFormComponent
   * @since 1.0.0
   * 
   * @type {FormGroup} form
   */
  public readonly form: FormGroup = this.formBuilder.group({
    email: this.formBuilder.control<string>('', [Validators.required, Validators.email]),
    password: this.formBuilder.control<string>('', [Validators.required])
  });
  //#endregion

  //#region Méthodes
  /**
   * Méthode onSubmit
   * 
   * Gestion de la soumission du formulaire
   * 
   * @access public
   * @memberof AuthLoginFormComponent
   * @since 1.0.0
   * 
   * @return {void} - Ne retourne rien
   */
  public onSubmit(): void {
  }
  //#endregion
}
