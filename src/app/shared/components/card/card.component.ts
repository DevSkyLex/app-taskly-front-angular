import { Component, contentChild, Signal } from '@angular/core';
import { CardHeaderComponent } from './card-header/card-header.component';
import { CardBodyComponent } from './card-body/card-body.component';
import { CardFooterComponent } from './card-footer/card-footer.component';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  //#region Propriétés
  /**
   * Propriété header
   * @readonly
   * 
   * Entête du composant card
   * 
   * @access public
   * @memberof CardComponent
   * @since 1.0.0
   * 
   * @type {Signal<CardHeaderComponent | undefined>} header
   */
  public readonly header: Signal<CardHeaderComponent | undefined> = 
    contentChild<CardHeaderComponent | undefined>(CardHeaderComponent);

  /**
   * Propriété body
   * @readonly
   * 
   * Corps du composant card
   * 
   * @access public
   * @memberof CardComponent
   * @since 1.0.0
   * 
   * @type {Signal<CardBodyComponent | undefined>} body
   */
  public readonly body: Signal<CardBodyComponent | undefined> =
    contentChild<CardBodyComponent | undefined>(CardBodyComponent);

  /**
   * Propriété footer
   * @readonly
   * 
   * Pied du composant card
   * 
   * @access public
   * @memberof CardComponent
   * @since 1.0.0
   * 
   * @type {Signal<CardFooterComponent | undefined>} footer
   */
  public readonly footer: Signal<CardFooterComponent | undefined> =
    contentChild<CardFooterComponent | undefined>(CardFooterComponent);
  //#endregion
}
