import { Component, inject, input, InputSignal, signal, Signal, WritableSignal } from '@angular/core';
import { Breadcrumbs, MetaService } from '@app/core/services/meta.service';

@Component({
  selector: 'app-breadcrumb',
  standalone: false,
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {
  //#region Propriétés
  /**
   * Propriété metaService
   * @readonly
   * 
   * Service de gestion des métadonnées
   * 
   * @access private
   * @memberof BreadcrumbComponent
   * @since 1.0.0
   * 
   * @type {MetaService} metaService
   */
  private readonly metaService: MetaService = 
    inject<MetaService>(MetaService);

  /**
   * Propriété breadcrumbs
   * @readonly
   * 
   * Signal du fil d'Ariane (breadcrumbs)
   * 
   * @access public
   * @memberof BreadcrumbComponent
   * @since 1.0.0
   * 
   * @type {Signal<Breadcrumbs>} breadcrumbs
   */
  public readonly breadcrumbs: Signal<Breadcrumbs> = 
    this.metaService.breadcrumbs;

  /**
   * Propriété max
   * @readonly
   * 
   * Signal du nombre maximum de
   * liens à afficher
   * 
   * @access public
   * @memberof BreadcrumbComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<number>} max
   */
  public readonly max: InputSignal<number> = 
    input<number>(3);

  /**
   * Propriété moreOpen
   * @readonly
   * 
   * Signal de l'état d'ouverture
   * 
   * @access public
   * @memberof BreadcrumbComponent
   * @since 1.0.0
   * 
   * @type {WritableSignal<boolean>} moreOpen
   */
  public readonly moreOpen: WritableSignal<boolean> = 
    signal<boolean>(false);
  //#endregion

  //#region Méthodes
  /**
   * Méthode toggleMore
   * 
   * Permet de basculer l'état
   * 
   * @access public
   * @memberof BreadcrumbComponent
   * @since 1.0.0
   * 
   * @return {void} - Ne retourne rien
   */
  public toggleMore(): void {
    this.moreOpen.set(!this.moreOpen());
  }

  /**
   * Méthode openMore
   * 
   * Permet d'ouvrir le menu
   * 
   * @access public
   * @memberof BreadcrumbComponent
   * @since 1.0.0
   * 
   * @return {void} - Ne retourne rien
   */
  public openMore(): void {
    this.moreOpen.set(true);
  }

  /**
   * Méthode closeMore
   * 
   * Permet de fermer le menu
   * 
   * @access public
   * @memberof BreadcrumbComponent
   * @since 1.0.0
   * 
   * @return {void} - Ne retourne rien
   */
  public closeMore(): void {
    this.moreOpen.set(false);
  }
  //#endregion
}
