import { AfterContentInit, Component, computed, contentChildren, input, InputSignal, signal, Signal, WritableSignal } from '@angular/core';
import { StepperStepComponent } from './stepper-step/stepper-step.component';

@Component({
  selector: 'app-stepper',
  standalone: false,
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
  exportAs: 'stepper'
})
export class StepperComponent implements AfterContentInit {
  //#region Propriétés
  /**
   * Propriété steps
   * @readonly
   * 
   * Permet de récupérer les étapes du stepper
   * 
   * @access public
   * @memberof StepperComponent
   * @since 1.0.0
   * 
   * @type {Signal<readonly StepperStepComponent[]>} steps
   */
  public readonly steps: Signal<readonly StepperStepComponent[]> =
    contentChildren<StepperStepComponent>(StepperStepComponent);

  /**
   * Propriété selected
   * @readonly
   * 
   * Permet de récupérer l'étape sélectionnée 
   * du stepper
   * 
   * @access public
   * @memberof StepperComponent
   * @since 1.0.0
   * 
   * @type {WritableSignal<StepperStepComponent | null>} selected
   */
  public readonly selected: WritableSignal<StepperStepComponent | null> =
    signal<StepperStepComponent | null>(null);
  //#endregion

  //#region Méthodes
  /**
   * Méthode ngAfterContentInit
   * 
   * Permet d'initialiser le stepper
   * 
   * @access public
   * @memberof StepperComponent
   * @since 1.0.0
   * 
   * @returns {void} - Ne retourne rien
   */
  public ngAfterContentInit(): void {
    /**
     * Récupération des étapes du 
     * stepper
     * 
     * @type {readonly StepperStepComponent[]} steps
     */
    const steps: readonly StepperStepComponent[] = this.steps();

    // Sélection de la première étape
    this.selected.set(steps[0]);
  }
  
  /**
   * Méthode select
   * 
   * Permet de sélectionner une étape du stepper
   * 
   * @access public
   * @memberof StepperComponent
   * @since 1.0.0
   * 
   * @param {number} index - Index de l'étape à sélectionner
   * 
   * @returns {void} - Ne retourne rien
   */
  public select(index: number): void {
    /**
     * Récupération des étapes du 
     * stepper
     * 
     * @type {readonly StepperStepComponent[]} steps
     */
    const steps: readonly StepperStepComponent[] = this.steps();

    /**
     * Récupération de l'étape à 
     * l'index donné
     * 
     * @type {StepperStepComponent} step
     */
    const step: StepperStepComponent = steps[index];

    /**
     * Récupération de l'étape 
     * actuellement sélectionnée
     * 
     * @type {StepperStepComponent | null} currentStep
     */
    const currentStep: StepperStepComponent | null = this.selected();

    /**
     * Récupération de l'optionnalité de
     * l'étape
     * 
     * @type {boolean} optional
     */
    const optional: boolean = currentStep === null || currentStep.optional();

    if (!optional && currentStep !== null) {
      /**
       * Récupération de la validité de
       * l'étape
       * 
       * @type {boolean} valid
       */
      const valid: boolean = currentStep.valid();

      // Si l'étape n'est pas valide, on arrête
      if (!valid) return;
    }

    // Toggle le completed de l'étape précédente
    if (index > 0) {
      steps[index - 1].markAsCompleted();
    }

    // Mise à jour de l'étape sélectionnée
    this.selected.set(step);
  }

  /**
   * Méthode next
   * 
   * Permet de passer à l'étape suivante
   * 
   * @access public
   * @memberof StepperComponent
   * @since 1.0.0
   * 
   * @returns {void} - Ne retourne rien
   */
  public next(): void {
    /**
     * Récupération des étapes du 
     * stepper
     * 
     * @type {readonly StepperStepComponent[]} steps
     */
    const steps: readonly StepperStepComponent[] = this.steps();

    /**
     * Récupération de l'étape 
     * sélectionnée
     * 
     * @type {StepperStepComponent | null} step
     */
    const step: StepperStepComponent | null = this.selected();

    if (step === null) return;

    const index: number = steps.indexOf(step);

    if (index === -1) return;
    if (index === steps.length - 1) return;

    this.select(index + 1);
  }

  /**
   * Méthode previous
   * 
   * Permet de revenir à l'étape précédente
   * 
   * @access public
   * @memberof StepperComponent
   * @since 1.0.0
   * 
   * @returns {void} - Ne retourne rien
   */
  public previous(): void {
    /**
     * Récupération des étapes du 
     * stepper
     * 
     * @type {readonly StepperStepComponent[]} steps
     */
    const steps: readonly StepperStepComponent[] = this.steps();

    /**
     * Récupération de l'étape 
     * sélectionnée
     * 
     * @type {StepperStepComponent | null} step
     */
    const step: StepperStepComponent | null = this.selected();

    if (step === null) return;

    const index: number = steps.indexOf(step);

    if (index === -1) return;

    if (index === 0) return;

    this.select(index - 1);
  }
  //#endregion
}
