import { Component, computed, input, InputSignal, model, ModelSignal, Signal } from '@angular/core';
import { InputSelectOption } from '../input/input-select/input-select.component';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  standalone: false,
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {
  //#region Propriétés
  /**
   * Propriété pageSize
   * @readonly
   * 
   * Nombre d'éléments par page
   * 
   * @access public
   * @memberof PaginatorComponent
   * @since 1.0.0
   * 
   * @type {ModelSignal<number>} pageSize
   */
  public readonly pageSize: ModelSignal<number> = model<number>(10);

  /**
   * Propriété pageSizeOptions
   * @readonly
   * 
   * Options de la taille de page
   * 
   * @access public
   * @memberof PaginatorComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<InputSelectOption<number>[]>} pageSizeOptions
   */
  public readonly pageSizeOptions: InputSignal<InputSelectOption<number>[]> = 
    input<InputSelectOption<number>[]>([
      { value: 5, label: '5' },
      { value: 10, label: '10' },
      { value: 20, label: '20' },
      { value: 50, label: '50' },
      { value: 100, label: '100' }
    ]);

  /**
   * Propriété totalItems
   * @readonly
   * 
   * Nombre total d'éléments
   * 
   * @access public
   * @memberof PaginatorComponent
   * @since 1.0.0
   * 
   * @type {InputSignal<number>} totalItems
   */
  public readonly totalItems: InputSignal<number> = input<number>(0);

  /**
   * Propriété currentPage
   * @readonly
   * 
   * Page courante
   * 
   * @access public
   * @memberof PaginatorComponent
   * @since 1.0.0
   * 
   * @type {ModelSignal<number>} currentPage
   */
  public readonly currentPage: ModelSignal<number> = model<number>(1);

  /**
   * Propriété totalPages
   * @readonly
   * 
   * Nombre total de pages
   * 
   * @access public
   * @memberof PaginatorComponent
   * @since 1.0.0
   * 
   * @type {Signal<number>} totalPages
   */
  public readonly totalPages: Signal<number> = computed(() => {
    return Math.ceil(this.totalItems() / this.pageSize());
  });

  /**
   * Propriété isFirstPage
   * @readonly
   * 
   * Indique si la page courante est la première
   * 
   * @access public
   * @memberof PaginatorComponent
   * @since 1.0.0
   * 
   * @type {Signal<boolean>} isFirstPage
   */
  public readonly isFirstPage: Signal<boolean> = computed(() => {
    return this.currentPage() === 1;
  });

  /**
   * Propriété isLastPage
   * @readonly
   * 
   * Indique si la page courante est la dernière
   * 
   * @access public
   * @memberof PaginatorComponent
   * @since 1.0.0
   * 
   * @type {Signal<boolean>} isLastPage
   */
  public readonly isLastPage: Signal<boolean> = computed(() => {
    return this.currentPage() === this.totalPages();
  });

  /**
   * Propriété pages
   * @readonly
   * 
   * Liste des numéros de page
   * 
   * @access public
   * @memberof PaginatorComponent
   * @since 1.0.0
   * 
   * @type {Signal<number[]>} pages
   */
  public readonly pages: Signal<number[]> = computed(() => {
    const pages = [];
    for (let i = 1; i <= this.totalPages(); i++) {
      pages.push(i);
    }
    return pages;
  });

  /**
   * Propriété pageToDisplay
   * @readonly
   * 
   * Liste des numéros de page à afficher
   * 
   * @access public
   * @memberof PaginatorComponent
   * @since 1.0.0
   * 
   * @type {Signal<number[]>} pageToDisplay
   */
  public readonly pageToDisplay: Signal<number[]> = computed(() => {
    const pages: number[] = [];
    const range: number = 2;

    if (this.currentPage() <= range + 1) {
      for (let i = 1; i <= Math.min(this.totalPages(), range * 2 + 1); i++) {
        pages.push(i);
      }
    }
    else if (this.currentPage() >= this.totalPages() - range) {
      for (let i = Math.max(1, this.totalPages() - range * 2); i <= this.totalPages(); i++) {
        pages.push(i);
      }
    }
    else {
      for (let i = this.currentPage() - range; i <= this.currentPage() + range; i++) {
        pages.push(i);
      }
    }

    return pages;
  });

  //#endregion

  //#region Méthodes
  /**
   * Méthode goTo
   * 
   * Permet de naviguer vers une page
   * 
   * @access public
   * @memberof PaginatorComponent
   * @since 1.0.0
   * 
   * @param {number} page - Numéro de la page
   * 
   * @returns {void} - Ne retourne rien
   */
  public goTo(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  /**
   * Méthode goToFirst
   * 
   * Permet de naviguer vers la première page
   * 
   * @access public
   * @memberof PaginatorComponent
   * @since 1.0.0
   * 
   * @returns {void} - Ne retourne rien
   */
  public goToFirst(): void {
    this.goTo(1);
  }

  /**
   * Méthode goToPrevious
   * 
   * Permet de naviguer vers la page précédente
   * 
   * @access public
   * @memberof PaginatorComponent
   * @since 1.0.0
   * 
   * @returns {void} - Ne retourne rien
   */
  public goToPrevious(): void {
    this.goTo(this.currentPage() - 1);
  }

  /**
   * Méthode goToNext
   * 
   * Permet de naviguer vers la page suivante
   * 
   * @access public
   * @memberof PaginatorComponent
   * @since 1.0.0
   * 
   * @returns {void} - Ne retourne rien
   */
  public goToNext(): void {
    this.goTo(this.currentPage() + 1);
  }

  /**
   * Méthode goToLast
   * 
   * Permet de naviguer vers la dernière page
   * 
   * @access public
   * @memberof PaginatorComponent
   * @since 1.0.0
   * 
   * @returns {void} - Ne retourne rien
   */
  public goToLast(): void {
    this.goTo(this.totalPages());
  }

  /**
   * Méthode resetPage
   * 
   * Permet de réinitialiser la page courante
   * 
   * @access public
   * @memberof PaginatorComponent
   * @since 1.0.0
   * 
   * @returns {void} - Ne retourne rien
   */
  public resetPage(): void {
    this.currentPage.set(1);
  }
  //#endregion
}