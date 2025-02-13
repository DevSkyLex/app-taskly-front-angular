import { Component, Signal, TemplateRef, viewChild } from '@angular/core';

@Component({
  selector: 'app-dropdown-content',
  standalone: false,
  templateUrl: './dropdown-content.component.html',
})
export class DropdownContentComponent {
  //#region Propriétés
  /**
   * Propriété template
   * @readonly
   *
   * Template du contenu du
   * menu déroulant
   *
   * @access public
   * @memberof DropdownContentComponent
   * @since 1.0.0
   *
   * @type {Signal<TemplateRef<any>>} template
   */
  public readonly template: Signal<TemplateRef<any>> =
    viewChild.required<TemplateRef<any>>(TemplateRef);
  //#endregion
}
