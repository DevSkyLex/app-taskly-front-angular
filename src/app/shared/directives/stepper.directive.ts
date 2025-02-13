import { Directive, HostListener, inject } from '@angular/core';
import { StepperComponent } from '../components/stepper/stepper.component';

@Directive({
  selector: '[appStepperNext]',
  standalone: false
})
export class StepperNextDirective {
  //#region Propriétés
  /**
   * Propriété stepper
   * @readonly
   * 
   * Permet de récupérer le composant 
   * stepper
   * 
   * @access public
   * @memberof StepperNextDirective
   * @since 1.0.0
   * 
   * @type {StepperComponent} stepper
   */
  public readonly stepper: StepperComponent =
    inject<StepperComponent>(StepperComponent);
  //#endregion

  //#region Méthodes
  /**
   * Méthode onClick
   * 
   * Permet de passer à l'étape suivante
   * du stepper
   * 
   * @access public
   * @memberof StepperNextDirective
   * @since 1.0.0
   * 
   * @returns {void} - Ne retourne rien
   */
  @HostListener('click', ['$event'])
  public onClick(): void {
    this.stepper.next();
  }
  //#endregion
}

@Directive({
  selector: '[appStepperPrevious]',
  standalone: false
})
export class StepperPreviousDirective {
  //#region Propriétés
  /**
   * Propriété stepper
   * @readonly
   * 
   * Permet de récupérer le composant 
   * stepper
   * 
   * @access public
   * @memberof StepperPreviousDirective
   * @since 1.0.0
   * 
   * @type {StepperComponent} stepper
   */
  public readonly stepper: StepperComponent =
    inject<StepperComponent>(StepperComponent);
  //#endregion

  //#region Méthodes
  /**
   * Méthode onClick
   * 
   * Permet de passer à l'étape précédente
   * du stepper
   * 
   * @access public
   * @memberof StepperPreviousDirective
   * @since 1.0.0
   * 
   * @returns {void} - Ne retourne rien
   */
  @HostListener('click', ['$event'])
  public onClick(): void {
    this.stepper.previous();
  }
  //#endregion
}
