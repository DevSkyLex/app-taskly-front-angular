import { Component, computed, input, InputSignal, Signal } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

type Violation = {
  key: string;
  params: Record<string, any>;
};

@Component({
  selector: 'app-input-errors',
  standalone: false,
  templateUrl: './input-errors.component.html',
  styleUrl: './input-errors.component.scss',
})
export class InputErrorsComponent {
  //#region Propriétés
  /**
   * Propriété errors
   * @readonly
   *
   * Définit les erreurs du contrôle
   *
   * @access public
   * @memberof InputErrorsComponent
   * @since 1.0.0
   *
   * @type {InputSignal<ValidationErrors | null>} errors
   */
  public readonly errors: InputSignal<ValidationErrors | null> = 
    input<ValidationErrors | null>(null);

  public readonly violations: Signal<Violation[]> = computed(() => {
    const errors = this.errors();

    if (!errors) {
      return [];
    }

    return Object.keys(errors).map(key => {
      return { key: key, params: errors[key] };
    });
  });
  //#endregion
}
