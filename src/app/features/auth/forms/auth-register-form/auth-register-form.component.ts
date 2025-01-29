import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppValidators } from '@app/shared/validators/app.validators';

@Component({
  selector: 'app-auth-register-form',
  standalone: false,
  templateUrl: './auth-register-form.component.html',
  styleUrl: './auth-register-form.component.scss'
})
export class AuthRegisterFormComponent {
  //#region Propriétés
  /**
   * Propriété formBuilder
   * @readonly
   * 
   * Constructeur de formulaire
   * 
   * @access private
   * @memberof AuthRegisterFormComponent
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
   * Formulaire d'inscription
   * 
   * @access public
   * @memberof AuthRegisterFormComponent
   * @since 1.0.0
   * 
   * @type {FormGroup} form
   */
  public readonly form: FormGroup = this.formBuilder.group({
    email: this.formBuilder.control<string>('', [
      Validators.required, 
      Validators.email
    ]),
    phone: this.formBuilder.control<string>(''),
    firstName: this.formBuilder.control<string>('', [
      Validators.minLength(2),
      Validators.maxLength(50)
    ]),
    lastName: this.formBuilder.control<string>('', [
      Validators.minLength(2),
      Validators.maxLength(50)
    ]),
    birthDate: this.formBuilder.control<Date>(new Date(), [
      Validators.required
    ]),
    password: this.formBuilder.control<string>('', [
      Validators.required, 
      Validators.minLength(8),
    ]),
    passwordConfirmation: this.formBuilder.control<string>('', [
      Validators.required, 
      Validators.minLength(8)
    ]),
    gender: this.formBuilder.control<string>('other'),
    avatar: this.formBuilder.control<FileList | null>(null),
    acceptTerms: this.formBuilder.control<boolean>(false, [
      Validators.requiredTrue
    ])
  });
  //#endregion

  //#region Méthodes
  /**
   * Méthode onSubmit
   * 
   * Permet de soumettre le formulaire
   * 
   * @access public
   * @memberof AuthRegisterFormComponent
   * @since 1.0.0
   * 
   * @return {void} - Ne retourne rien
   */
  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    console.log(this.form.value);
  }
  //#endregion
}
