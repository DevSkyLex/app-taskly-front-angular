import { AbstractControl, ValidatorFn } from "@angular/forms";

export class AppValidators {
  //#region Méthodes
  /**
   * Méthode phone
   * @static
   * 
   * Permet de valider un numéro de téléphone
   * en fonction d'une expression régulière
   * 
   * @access public
   * @memberof AppValidators
   * @since 1.0.0
   * 
   * @param {AbstractControl} control - Contrôle
   * @param {RegExp} regex - Expression régulière
   * 
   * @returns {ValidatorFn} - Fonction de validation
   */
  public static phone(control: AbstractControl, regex: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value && !regex.test(control.value)) {
        return { phone: true };
      }
      return null;
    };
  }

  /**
   * Méthode match
   * @static
   * 
   * Permet de valider si deux champs sont identiques
   * 
   * @access public
   * @memberof AppValidators
   * @since 1.0.0
   * 
   * @param {string} controlName - Nom du contrôle
   * @param {string} matchingControlName - Nom du contrôle de comparaison
   * 
   * @returns {ValidatorFn} - Fonction de validation
   */
  public static match(controlName: string, matchingControlName: string): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: any } | null => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      if (matchingControl && control?.value !== matchingControl.value) {
        matchingControl.setErrors({ match: true });
        return { match: true };
      } else {
        if (matchingControl) {
          matchingControl.setErrors(null);
        }
        return null;
      }
    };
  }

  /**
   * Méthode passwordMatch
   * @static
   * 
   * Permet de valider si deux champs sont identiques
   * 
   * @access public
   * @memberof AppValidators
   * @since 1.0.0
   * 
   * @param {string} controlName - Nom du contrôle
   * @param {string} matchingControlName - Nom du contrôle de comparaison
   * 
   * @returns {ValidatorFn} - Fonction de validation
   */
  public static passwordMatch(controlName: string, matchingControlName: string): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: any } | null => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      if (control?.value !== matchingControl?.value) {
        matchingControl?.setErrors({ passwordMatch: true });
        return { passwordMatch: true };
      } else {
        matchingControl?.setErrors(null);
        return null;
      }
    };
  }
  //#endregion
}