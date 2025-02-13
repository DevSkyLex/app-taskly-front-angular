import { Directive, input, InputSignal } from '@angular/core';

export type LinkVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

@Directive({
  selector: 'a[appLink]',
  standalone: false,
  host: { 
    class: 'link',
    '[class.link--primary]': 'variant() === "primary"',
    '[class.link--secondary]': 'variant() === "secondary"',
    '[class.link--success]': 'variant() === "success"',
    '[class.link--danger]': 'variant() === "danger"',
    '[class.link--warning]': 'variant() === "warning"',
    '[class.link--info]': 'variant() === "info"',
  }
})
export class LinkDirective {
  //#region Propriétés
  /**
   * Propriété variant
   * @readonly
   * 
   * Variante du lien
   * 
   * @access public
   * @memberof LinkDirective
   * @since 1.0.0
   * 
   * @type {InputSignal<LinkVariant>} variant
   */
  public readonly variant: InputSignal<LinkVariant> = 
    input<LinkVariant>('primary');
  //#endregion
}
