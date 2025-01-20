import { Component, inject, Signal } from '@angular/core';
import { MetaService } from '@core/services/meta.service';

@Component({
  selector: 'app-main-layout-content',
  imports: [],
  templateUrl: './main-layout-content.component.html',
  styleUrl: './main-layout-content.component.scss'
})
export class MainLayoutContentComponent {
  //#region Propriétés
  /**
   * Propriété metaService
   * @readonly
   * 
   * Service de gestion des métadonnées
   * 
   * @access private
   * @memberof MainLayoutContentComponent
   * @since 1.0.0
   * 
   * @type {MetaService} metaService
   */
  private readonly metaService: MetaService = 
    inject<MetaService>(MetaService);

  /**
   * Propriété title
   * @readonly
   * 
   * Signal du titre de la page
   * 
   * @access public
   * @memberof MainLayoutContentComponent
   * @since 1.0.0
   * 
   * @type {Signal<string>} title
   */
  public readonly title: Signal<string> = 
    this.metaService.title;
  //#endregion
}
