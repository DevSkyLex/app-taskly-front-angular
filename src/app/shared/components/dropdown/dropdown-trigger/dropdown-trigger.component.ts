import { Component, Signal, TemplateRef, viewChild } from '@angular/core';

@Component({
  selector: 'app-dropdown-trigger',
  standalone: false,
  templateUrl: './dropdown-trigger.component.html',
})
export class DropdownTriggerComponent {
  //#region Propriétés
  /**
   * Propriété template
   * @readonly
   *
   * Template du déclencheur du 
   * menu déroulant
   *
   * @access public
   * @memberof DropdownTriggerComponent
   * @since 1.0.0
   *
   * @type {Signal<TemplateRef<any>>} template
   */
  public readonly template: Signal<TemplateRef<any>> =
    viewChild.required<TemplateRef<any>>(TemplateRef);
  //#endregion
}
