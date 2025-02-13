import { Component, computed, input, InputSignal, signal, Signal, WritableSignal } from '@angular/core';

export type ResizablePanelGroupDirection = 'horizontal' | 'vertical';

@Component({
  selector: 'app-resizable-panel-group',
  standalone: false,
  
  templateUrl: './resizable-panel-group.component.html',
  styleUrl: './resizable-panel-group.component.scss'
})
export class ResizablePanelGroupComponent {
  //#region Propriétés
  /**
   * Propriété direction
   * @readonly
   * 
   * Permet d'afficher la direction
   * du groupe de panneaux redimensionnables
   * 
   * @access public
   * @memberof ResizablePanelGroupComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<ResizablePanelGroupDirection>} direction
   */
  public readonly direction: InputSignal<ResizablePanelGroupDirection> =
    input<ResizablePanelGroupDirection>('horizontal');

  /**
   * Propriété classes
   * @readonly
   * 
   * Permet d'afficher les classes
   * du groupe de panneaux redimensionnables
   * 
   * @access public
   * @memberof ResizablePanelGroupComponent
   * @since 1.0.0
   * 
   * @type {Signal<string[]>} classes
   */
  public readonly classes: Signal<string[]> = computed(() => {
    return [
      'resizable-panel-group', 
      'resizable-panel-group--' + this.direction()
    ];
  });
  //#endregion
}
