import { Component, inject, Signal, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InputSelectOption } from '@app/shared/components/input/input-select/input-select.component';

@Component({
  selector: 'app-account-update-profile-form',
  standalone: false,
  
  templateUrl: './account-update-profile-form.component.html',
  styleUrl: './account-update-profile-form.component.scss'
})
export class AccountUpdateProfileFormComponent {
  //#region Propriétés
  /**
   * Propriété formBuilder
   * @readonly
   * 
   * Constructeur de formulaire
   * 
   * @access private
   * @memberof AccountUpdateProfileFormComponent
   * @since 1.0.0
   * 
   * @type {FormBuilder} formBuilder
   */
  private readonly formBuilder: FormBuilder =
    inject<FormBuilder>(FormBuilder);

  public readonly form: FormGroup = this.formBuilder.group({
    gender: this.formBuilder.control<string>('other'),
    birthDate: this.formBuilder.control<Date>(new Date(), []),
    avatar: this.formBuilder.control<FileList | null>(null),
    phone: this.formBuilder.control<string>(''),
  });

  public readonly genderOptions: Signal<InputSelectOption<string>[]> = signal<InputSelectOption<string>[]>([
    { value: 'male', label: 'Homme' },
    { value: 'female', label: 'Femme' },
    { value: 'other', label: 'Autre' },
  ]);

  public readonly birthDateMin: Signal<Date> = signal<Date>(new Date(1900, 0, 1));

  public readonly birthDateMax: Signal<Date> = signal<Date>(new Date());
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
