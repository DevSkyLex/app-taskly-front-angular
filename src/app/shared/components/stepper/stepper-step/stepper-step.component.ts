import { CdkStepper } from '@angular/cdk/stepper';
import { Component, computed, effect, forwardRef, input, InputSignal, model, ModelSignal, signal, Signal, TemplateRef, viewChild, WritableSignal } from '@angular/core';
import { AbstractControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-stepper-step',
  standalone: false,
  templateUrl: './stepper-step.component.html',
  styleUrl: './stepper-step.component.scss',
})
export class StepperStepComponent {
  //#region Propriétés
  /**
   * Propriété stepControl
   * @readonly
   * 
   * Permet de récupérer le contrôle associé à 
   * l'étape du stepper
   * 
   * @access public
   * @memberof StepperStepComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<AbstractControl | null>} stepControl
   */
  public readonly stepControl: InputSignal<AbstractControl | null> = 
    input<AbstractControl | null>(null);

  /**
   * Propriété label
   * @readonly
   * 
   * Permet de récupérer le label associé à
   * l'étape du stepper
   * 
   * @access public
   * @memberof StepperStepComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<string>} label
   */
  public readonly label: InputSignal<string> = 
    input.required<string>();

  /**
   * Propriété icon
   * @readonly
   * 
   * Permet de récupérer l'icône associée à
   * l'étape du stepper
   * 
   * @access public
   * @memberof StepperStepComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<string | null>} icon
   */
  public readonly icon: InputSignal<string | null> =
    input<string | null>(null);

  /**
   * Propriété description
   * @readonly
   * 
   * Permet de récupérer la description associée à
   * l'étape du stepper
   * 
   * @access public
   * @memberof StepperStepComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<string | null>} description
   */
  public readonly description: InputSignal<string | null> =
    input<string | null>(null);

  /**
   * Propriété optional
   * @readonly
   * 
   * Permet de récupérer l'information sur le fait
   * que l'étape du stepper est optionnelle
   * 
   * @access public
   * @memberof StepperStepComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<boolean>} optional
   */
  public readonly optional: InputSignal<boolean> =
    input<boolean>(false);

  /**
   * Propriété editable
   * @readonly
   * 
   * Permet de récupérer l'information sur le fait
   * que l'étape du stepper est éditable
   * 
   * @access public
   * @memberof StepperStepComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<boolean>} editable
   */
  public readonly editable: InputSignal<boolean> =
    input<boolean>(false);

  /**
   * Propriété completed
   * @readonly
   * 
   * Permet de récupérer l'information sur le fait
   * que l'étape du stepper est complétée
   * 
   * @access public
   * @memberof StepperStepComponent
   * @since 1.0.0
   * 
   * @type {ModelSignal<boolean>} completed
   */
  public readonly completed: ModelSignal<boolean> =
    model<boolean>(false);

  /**
   * Propriété template
   * @readonly
   * 
   * Permet de récupérer le template associé à
   * l'étape du stepper
   * 
   * @access public
   * @memberof StepperStepComponent
   * @since 1.0.0
   * 
   * @type {Signal<TemplateRef<any>>} template
   */
  public readonly template: Signal<TemplateRef<any>> =
    viewChild.required<TemplateRef<any>>(TemplateRef);

  /**
   * Propriété valid
   * @readonly
   * 
   * Permet de récupérer l'information sur le fait
   * que l'étape du stepper est valide
   * 
   * @access public
   * @memberof StepperStepComponent
   * @since 1.0.0
   * 
   * @type {Signal<boolean>} valid
   */
  public readonly valid: WritableSignal<boolean> = 
    signal<boolean>(false);

  /**
   * Propriété invalid
   * @readonly
   * 
   * Permet de récupérer l'information sur le fait
   * que l'étape du stepper est invalide
   * 
   * @access public
   * @memberof StepperStepComponent
   * @since 1.0.0
   * 
   * @type {Signal<boolean>} invalid
   */
  public readonly invalid: Signal<boolean> = 
    computed(() => !this.valid());

  //#region Constructeur
  /**
   * Constructeur
   * @constructor
   * 
   * Initialisation du composant stepper-step
   * 
   * @access public
   * @memberof StepperStepComponent
   * @since 1.0.0
   */
  public constructor() {
    effect(() => {
      const control: AbstractControl | null = this.stepControl();

      if (!control) {
        this.valid.set(true);
        return;
      }

      control.statusChanges.subscribe(() => {
        this.valid.set(control.valid);
      });
    });
  }
  //#endregion

  //#region Méthodes
  /**
   * Méthode markAsCompleted
   * 
   * Permet de marquer l'étape du stepper
   * comme complétée
   * 
   * @access public
   * @memberof StepperStepComponent
   * @since 1.0.0
   * 
   * @returns {void} - Ne retourne rien
   */
  public markAsCompleted(): void {
    if (this.valid()) {
      this.completed.set(true);
    }
  }

  /**
   * Méthode markAsUncompleted
   * 
   * Permet de marquer l'étape du stepper
   * comme non complétée
   * 
   * @access public
   * @memberof StepperStepComponent
   * @since 1.0.0
   * 
   * @returns {void} - Ne retourne rien
   */
  public markAsUncompleted(): void {
    this.completed.set(false);
  }
  //#endregion
}
