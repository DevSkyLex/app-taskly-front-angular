import { Component, contentChildren, signal, Signal, WritableSignal } from '@angular/core';
import { TocItemComponent } from './toc-item/toc-item.component';

@Component({
  selector: 'app-toc',
  standalone: false,
  templateUrl: './toc.component.html',
  styleUrl: './toc.component.scss',
})
export class TocComponent {
  //#region Propriétés
  /**
   * Propriété items
   * @readonly
   * 
   * Liste des éléments de la table des matières
   * 
   * @access public
   * @memberof TocComponent
   * @since 1.0.0
   * 
   * @type {Signal<readonly TocItemComponent[]>} items
   */
  public readonly items: Signal<readonly TocItemComponent[]> = 
    contentChildren<TocItemComponent>(TocItemComponent);
  /**
   * Propriété active
   * @readonly
   * 
   * Élément actif de la table des matières
   * 
   * @access public
   * @memberof TocComponent
   * @since 1.0.0
   * 
   * @type {WritableSignal<TocItemComponent>} active
   */
  public readonly active: WritableSignal<TocItemComponent> =
    signal<TocItemComponent>(this.items()[0]);

  /**
   * Propriété observer
   * @readonly
   * 
   * Observateur d'intersection
   * 
   * @access public
   * @memberof TocComponent
   * @since 1.0.0
   * 
   * @type {IntersectionObserver} observer
   */
  public readonly observer: IntersectionObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const found: TocItemComponent | undefined = this.items().find(item => item.id() === entry.target.id);
          if (found) this.active.set(found);
        }
      });
    },
    {
      rootMargin: '0px',
      threshold: 0.5,
    }
  );
  //#endregion

  //#region Méthodes
  /**
   * Méthode ngAfterViewInit
   * 
   * Méthode du cycle de vie du composant appelée 
   * après l'initialisation des vues enfants
   * 
   * @access public
   * @memberof TocComponent
   * @since 1.0.0
   * 
   * @returns {void} - Ne retourne rien
   */
  public ngAfterViewInit(): void {
    /**
     * Permet de tracker le défilement
     * de la page
     * 
     * @see TocComponent#trackScroll
     */
    this.trackScroll();
  }

  /**
   * Méthode trackScroll
   * 
   * Permet de tracker le défilement dans le composant
   * table des matières
   * 
   * @access private
   * @memberof TocComponent
   * @since 1.0.0
   * 
   * @returns {void} - Ne retourne rien
   */
  private trackScroll(): void {
    this.items().forEach(item => {
      const target: HTMLElement | null = document.getElementById(item.id());
      if (target) this.observer.observe(target);
    });
  }

  /**
   * Méthode isActivated
   * 
   * Vérifie si l'élément est actif
   * 
   * @access public
   * @memberof TocComponent
   * @since 1.0.0
   * 
   * @param {TocItemComponent} item - Élément de la table des matières
   * 
   * @returns {boolean} - Retourne vrai si l'élément est actif, faux sinon
   */
  public isActivated(item: TocItemComponent): boolean {
    return item === this.active();
  }

  /**
   * Méthode scrollTo
   * 
   * Défilement vers l'élément de la table des matières
   * 
   * @access public
   * @memberof TocComponent
   * @since 1.0.0
   * 
   * @param {string} id - Identifiant de l'élément
   * 
   * @returns {void} - Ne retourne rien
   */
  public scrollTo(id: string): void {
    const target: HTMLElement | null = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const found: TocItemComponent | undefined = this.items().find(item => item.id() === id);
      if (found) this.active.set(found);
    }
  }
  //#endregion
}
