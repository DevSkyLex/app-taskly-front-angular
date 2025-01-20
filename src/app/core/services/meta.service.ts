import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { environment } from '@env/environment';
import { filter } from 'rxjs';

export type Breadcrumb = {
  label: string;
  url: string;
};

export type Breadcrumbs = Breadcrumb[];

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  //#region Propriétés
  /**
   * Propriété metaService
   * @readonly
   * 
   * Service de gestion des métadonnées
   * dans l'application
   * 
   * @access private
   * @memberof MetaService
   * @since 1.0.0
   * 
   * @type {Meta} meta
   */
  private readonly metaService: Meta = 
    inject<Meta>(Meta);

  /**
   * Propriété titleService
   * @readonly
   * 
   * Service de gestion du titre de la page
   * 
   * @access private
   * @memberof MetaService
   * @since 1.0.0
   * 
   * @type {Title} titleService
   */
  private readonly titleService: Title = 
    inject<Title>(Title);

  /**
   * Propriété _breadcrumbs
   * @readonly
   * 
   * Signal du fil d'Ariane (breadcrumbs)
   * 
   * @access private
   * @memberof MetaService
   * @since 1.0.0
   * 
   * @type {WritableSignal<Breadcrumbs>} breadcrumbs
   */
  private readonly _breadcrumbs: WritableSignal<Breadcrumbs> = 
    signal<Breadcrumbs>([]);

  /**
   * Propriété router
   * @readonly
   * 
   * Service de gestion des routes
   * 
   * @access private
   * @memberof MetaService
   * @since 1.0.0
   * 
   * @type {Router} router
   */
  private readonly router: Router = 
    inject<Router>(Router);

  /**
   * Propriété activatedRoute
   * @readonly
   * 
   * Service de gestion de la route active
   * 
   * @access private
   * @memberof MetaService
   * @since 1.0.0
   * 
   * @type {ActivatedRoute} activatedRoute
   */
  private readonly activatedRoute: ActivatedRoute = 
    inject<ActivatedRoute>(ActivatedRoute);

  /**
   * Propriété _title
   * 
   * Signal du titre de la page
   * 
   * @access private
   * @memberof MetaService
   * @since 1.0.0
   * 
   * @type {WritableSignal<string>} title
   */
  private readonly _title: WritableSignal<string> = 
    signal<string>('');
  //#endregion

  //#region Constructeur
  /**
   * Constructeur
   * @constructor
   * 
   * Initialise le service de gestion
   * des métadonnées
   * 
   * @access public
   * @memberof MetaService
   * @since 1.0.0
   */
  public constructor() {
    this.updateBreadcrumbs();
    this.updateTitle();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateBreadcrumbs();
      this.updateTitle();
    });
  }
  //#endregion

  //#region Méthodes
  /**
   * Méthode updateBreadcrumbs
   * 
   * Met à jour le fil d'Ariane
   * 
   * @access private
   * @memberof MetaService
   * @since 1.0.0
   * 
   * @returns {void} - Ne retourne rien
   */
  private updateBreadcrumbs(): void {
    const breadcrumbs: Breadcrumbs = this.generateBreadcrumbs(
      this.activatedRoute.root
    );

    this._breadcrumbs.set(breadcrumbs);
  }

  /**
   * Méthode updateTitle
   * 
   * Met à jour le titre de la page
   * 
   * @access private
   * @memberof MetaService
   * @since 1.0.0
   * 
   * @returns {void} - Ne retourne rien
   */
  private updateTitle(): void {
    let route: ActivatedRoute = this.activatedRoute;
    while (route.firstChild) route = route.firstChild;
    const title: string = route.snapshot.data['title'];
    if (title) this.title = title;
  }

  /**
   * Méthode generateBreadcrumbs
   * 
   * Génère le fil d'Ariane
   * 
   * @access private
   * @memberof MetaService
   * @since 1.0.0
   * 
   * @param {ActivatedRoute} route - Route active
   * @param {string} url - URL
   * @param {Breadcrumbs} breadcrumbs - Fil d'Ariane
   * 
   * @returns {Breadcrumbs} - Fil d'Ariane
   */
  private generateBreadcrumbs(
    route: ActivatedRoute, 
    url: string = '', 
    breadcrumbs: Breadcrumbs = []
  ): Breadcrumbs {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) 
      return breadcrumbs;

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path)
        .join('/');

      if (routeURL !== '')
        url += `/${routeURL}`;

      const label: string = child.snapshot.data['breadcrumb'];

      if (label) {
        breadcrumbs.push({ 
          label: label, 
          url: url 
        });
      }

      return this.generateBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }

  /**
   * Méthode breadcrumbs (getter)
   * 
   * Retourne le signal du fil 
   * d'Ariane
   * 
   * @access public
   * @memberof MetaService
   * @since 1.0.0
   * 
   * @returns {Signal<Breadcrumbs>} - Signal du fil d'Ariane
   */
  public get breadcrumbs(): Signal<Breadcrumbs> {
    return this._breadcrumbs.asReadonly();
  }

  /**
   * Méthode lastBreadcrumb (setter)
   * 
   * Modifie le dernier élément du fil d'Ariane
   * 
   * @access public
   * @memberof MetaService
   * @since 1.0.0
   * 
   * @param {string} label - Libellé
   */
  public set lastBreadcrumb(label: string) {
    const breadcrumbs: Breadcrumbs = this._breadcrumbs();
    breadcrumbs[breadcrumbs.length - 1].label = label;
    this._breadcrumbs.set(breadcrumbs);
  }

  /**
   * Méthode title (setter)
   * 
   * Modifie le titre de la page
   * 
   * @access public
   * @memberof MetaService
   * @since 1.0.0
   * 
   * @param {string} title - Titre
   */
  public set title(title: string) {
    /**
     * Nom de l'application récupéré
     * depuis l'environnement
     */
    const appName: string = environment.app.name;

    /**
     * Mise à jour du titre de la page
     * dans le signal _title
     */
    this._title.set(title);

    /**
     * Mise à jour du titre de la page
     * dans le navigateur
     */
    this.titleService.setTitle(`${title} - ${appName}`);
  }

  /**
   * Méthode title (getter)
   * 
   * Retourne le signal du titre
   * de la page
   * 
   * @access public
   * @memberof MetaService
   * @since 1.0.0
   * 
   * @returns {Signal<string>} - Signal du titre de la page
   */
  public get title(): Signal<string> {
    return this._title.asReadonly();
  }
  //#endregion
}
