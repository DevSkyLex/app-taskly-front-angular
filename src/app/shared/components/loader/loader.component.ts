import { Component, computed, input, InputSignal, Signal } from '@angular/core';

export type LoaderVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark';

@Component({
  selector: 'app-loader',
  standalone: false,
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  //#region Propriétés
  /**
   * Propriété size
   * @readonly
   * 
   * Taille du loader
   * 
   * @access public
   * @memberof LoaderComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<string>} size
   */
  public readonly size: InputSignal<string> = 
    input<string>('1em');

  /**
   * Propriété variant
   * @readonly
   * 
   * Variante du loader
   * 
   * @access public
   * @memberof LoaderComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<LoaderVariant>} variant
   */
  public readonly variant: InputSignal<LoaderVariant> = 
    input<LoaderVariant>('dark');

  /**
   * Propriété classes
   * @readonly
   * 
   * Classes du loader
   * 
   * @access public
   * @memberof LoaderComponent
   * @since 1.0.0
   * 
   * @type {Signal<string[]>} classes
   */
  public readonly classes: Signal<string[]> = computed(() => {
    return [
      'loader',
      `loader--${this.variant()}`,
    ];
  });
  //#endregion
}
