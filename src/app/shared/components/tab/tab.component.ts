import { Component, contentChild, input, InputSignal, Signal, signal, TemplateRef, viewChild, WritableSignal } from '@angular/core';
import { TabLabelDirective } from '@app/shared/directives/tab-label.directive';

@Component({
  selector: 'app-tab',
  standalone: false,
  templateUrl: './tab.component.html',
})
export class TabComponent {
  //#region Propriétés
  /**
   * Propriété label
   * @readonly
   * 
   * Libellé de l'onglet
   * 
   * @access public
   * @memberof TabComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<string | null>} label
   */
  public readonly label: InputSignal<string | null> = 
    input<string | null>(null);

  /**
   * Propriété selected
   * @readonly
   * 
   * Indique si l'onglet est sélectionné
   * 
   * @access public
   * @memberof TabComponent
   * @since 1.0.0
   * 
   * @type {WritableSignal<boolean>} selected
   */
  public readonly selected: WritableSignal<boolean> =
    signal<boolean>(false);

  /**
   * Propriété template
   * @readonly
   * 
   * Template de l'onglet
   * 
   * @access public
   * @memberof TabComponent
   * @since 1.0.0
   * 
   * @type {Signal<TemplateRef<any>>} template
   */
  public readonly template: Signal<TemplateRef<any>> =
    viewChild.required<TemplateRef<any>>(TemplateRef);

  /**
   * Propriété labelTemplate
   * @readonly
   * 
   * Template du libellé de l'onglet
   * 
   * @access public
   * @memberof TabComponent
   * @since 1.0.0
   * 
   * @type {Signal<TemplateRef<any>>} labelTemplate
   */
  public readonly labelTemplate: Signal<TemplateRef<any> | undefined> = 
    contentChild<TabLabelDirective, TemplateRef<any>>(TabLabelDirective, { read: TemplateRef });
  //#endregion
}
