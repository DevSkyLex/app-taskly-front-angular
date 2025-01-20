import { Component, computed, input, InputSignal, Signal } from '@angular/core';

export type SeparatorOrientation = 'horizontal' | 'vertical';

@Component({
  selector: 'app-separator',
  standalone: false,
  templateUrl: './separator.component.html',
  styleUrl: './separator.component.scss',
})
export class SeparatorComponent {
  //#region Propriétés
  /**
   * Propriété orientation
   * @readonly
   * 
   * Orientation du séparateur
   * 
   * @access public
   * @memberof SeparatorComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<SeparatorOrientation>} orientation
   */
  public readonly orientation: InputSignal<SeparatorOrientation> = 
    input<SeparatorOrientation>('horizontal');

  /**
   * Propriété classes
   * @readonly
   * 
   * Classes du séparateur
   * 
   * @access public
   * @memberof SeparatorComponent
   * @since 1.0.0
   * 
   * @type {Signal<string[]>} classes
   */
  public readonly classes: Signal<string[]> = computed(() => {
    return [
      'separator',
      `separator--${this.orientation()}`
    ];
  });
  //#endregion
}
