import { Component, computed, input, InputSignal, Signal } from '@angular/core';

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  standalone: false,
  styleUrl: './badge.component.scss'
})
export class BadgeComponent {
  //#region Propriétés
  /**
   * Propriété variant
   * @readonly
   * 
   * Variante du badge
   * 
   * @access public
   * @memberof BadgeComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<BadgeVariant>} variant
   */
  public readonly variant: InputSignal<BadgeVariant> = input<BadgeVariant>('primary');

  /**
   * Propriété variantClass
   * @readonly
   * 
   * Classe de la variante du badge
   * 
   * @access public
   * @memberof BadgeComponent
   * @since 1.0.0
   * 
   * @type {Signal<string>} variantClass
   */
  public readonly variantClass: Signal<string> = computed<string>(() => {
    return `badge--${this.variant()}`;
  });
  //#endregion
}
