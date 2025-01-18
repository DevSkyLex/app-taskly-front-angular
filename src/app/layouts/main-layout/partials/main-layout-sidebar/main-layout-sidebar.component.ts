import { CommonModule } from '@angular/common';
import { Component, signal, Signal } from '@angular/core';
import { CdkAccordionModule } from '@angular/cdk/accordion';

type SidebarCategory = {
  title: string;
  items: SidebarItem[];
};

type SidebarItem = {
  label: string;
  to?: string | string[];
  icon?: string;
  children?: SidebarItem[];
};

@Component({
  selector: 'app-main-layout-sidebar',
  imports: [CommonModule, CdkAccordionModule],
  templateUrl: './main-layout-sidebar.component.html',
  styleUrl: './main-layout-sidebar.component.scss'
})
export class MainLayoutSidebarComponent {
  //#region Propriétés
  /**
   * Propriété navigation
   * @readonly
   * 
   * Tableau des liens de navigation
   * 
   * @access public
   * @memberof MainLayoutSidebarComponent
   * @since 1.0.0
   * 
   * @type {Signal<SidebarCategory[]>} navigation
   */
  public readonly navigation: Signal<SidebarCategory[]> = signal<SidebarCategory[]>([
    {
      title: 'Général',
      items: [
        {
          label: 'Tableau de bord',
          to: '',
          icon: 'home'
        }
      ]
    }
  ]);
  //#endregion
}
