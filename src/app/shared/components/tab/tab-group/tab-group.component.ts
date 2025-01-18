import { Component, contentChildren, OnInit, Signal } from '@angular/core';
import { TabComponent } from '../tab.component';

@Component({
  selector: 'app-tab-group',
  standalone: false,
  templateUrl: './tab-group.component.html',
  styleUrl: './tab-group.component.scss'
})
export class TabGroupComponent implements OnInit {
  //#region Propriétés
  /**
   * Propriété tabs
   * @readonly
   * 
   * Liste des onglets
   * 
   * @access public
   * @memberof TabGroupComponent
   * @since 1.0.0
   * 
   * @type {Signal<readonly TabComponent[]>} tabs
   */
  public readonly tabs: Signal<readonly TabComponent[]> =
    contentChildren<TabComponent>(TabComponent);
  //#endregion

  //#region Méthodes
  /**
   * Méthode ngOnInit
   * 
   * Méthode du cycle de vie du composant
   * appelée après la construction du composant
   * 
   * @access public
   * @memberof TabGroupComponent
   * @since 1.0.0
   * 
   * @return {void} - Ne retourne rien
   */
  public ngOnInit(): void {
    this.tabs().forEach((tab: TabComponent, index: number) => {
      tab.selected.set(index === 0);
    });
  }

  /**
   * Méthode onTabClick
   * 
   * Cette méthode permet de gérer le clic 
   * sur un onglet
   * 
   * @access public
   * @memberof TabGroupComponent
   * @since 1.0.0
   * 
   * @param {TabComponent} tab - Onglet
   * 
   * @return {void} - Ne retourne rien
   */
  public onTabClick(tab: TabComponent): void {
    this.tabs().forEach((t: TabComponent) => 
      t.selected.set(t === tab));

    tab.selected.set(true);
  }
  //#endregion
}
