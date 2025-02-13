import { Directive, input, InputSignal } from '@angular/core';

export type TextVariant = 'light' | 'dark' | 'muted';

@Directive({
  selector: 'p[appText], span[appText]',
  standalone: false,
  host: { 
    class: 'text',
    '[class.text--light]': 'variant() === "light"',
    '[class.text--dark]': 'variant() === "dark"',
    '[class.text--muted]': 'variant() === "muted"'
  }
})
export class TextDirective {
  //#region Propriétés
  /**
   * Propriété variant
   * @readonly
   * 
   * Variante du texte
   * 
   * @access public
   * @memberof TextDirective
   * @since 1.0.0
   * 
   * @type {InputSignal<TextVariant>} variant
   */
  public readonly variant: InputSignal<TextVariant> = 
    input<TextVariant>('dark');
  //#endregion
}
