import { Component, ElementRef, inject, input, InputSignal, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-toc-item',
  standalone: false,
  templateUrl: './toc-item.component.html',
  styleUrl: './toc-item.component.scss',
  host: {
    "id": 'id()'
  }
})
export class TocItemComponent {
  //#region Propriétés
  /**
   * Propriété title
   * @readonly
   * 
   * Titre de l'élément de la table 
   * des matières
   * 
   * @access public
   * @memberof TocItemComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<string>} title
   */
  public readonly title: InputSignal<string> = 
    input.required<string>();

  /**
   * Propriété id
   * @readonly
   * 
   * Identifiant de l'élément de la table
   * des matières
   * 
   * @access public
   * @memberof TocItemComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<string>} id
   */
  public readonly id: InputSignal<string> =
    input.required<string>();

  /**
   * Propriété elementRef
   * @readonly
   * 
   * Référence de l'élément de la table des
   * matières
   * 
   * @access public
   * @memberof TocItemComponent
   * @since 1.0.0
   * 
   * @type {ElementRef} elementRef
   */
  public readonly elementRef: ElementRef = 
    inject<ElementRef>(ElementRef);
  //#endregion
}
