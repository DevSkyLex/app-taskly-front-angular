import { CommonModule } from '@angular/common';
import { Component, inject, signal, Signal } from '@angular/core';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { transition, trigger, useAnimation } from '@angular/animations';
import { AnimationTiming, AppAnimations } from '@shared/animations/app.animations';
import { environment } from '@env/environment';
import { SidebarService } from '@app/shared/services/sidebar.service';

type SidebarGroup = {
  title: string;
  items: SidebarItem[];
};

type SidebarItem = {
  label: string;
  to?: string | string[];
  icon?: string;
  items?: SidebarItem[];
};

@Component({
  selector: 'app-main-layout-sidebar',
  imports: [
    CommonModule, 
    CdkAccordionModule,
    RouterModule, 
    SharedModule,
  ],
  templateUrl: './main-layout-sidebar.component.html',
  styleUrl: './main-layout-sidebar.component.scss',
  animations: [
    trigger('collapsibleAnimation', [
      transition(':enter', [
        useAnimation(AppAnimations.expand, {
          params: { timing: AnimationTiming.FAST }
        })
      ]),
      transition(':leave', [
        useAnimation(AppAnimations.collapse, {
          params: { timing: AnimationTiming.FAST }
        })
      ]),
    ])
  ]
})
export class MainLayoutSidebarComponent {
  //#region Propriétés
  /**
   * Propriété appName
   * @readonly
   * 
   * Nom de l'application
   * 
   * @access public
   * @memberof MainLayoutSidebarComponent
   * @since 1.0.0
   * 
   * @type {string} appName
   */
  public readonly appName: string = environment.app.name;

  /**
   * Propriété sidebarService
   * @readonly
   * 
   * Service de panneau latéral
   * 
   * @access public
   * @memberof MainLayoutSidebarComponent
   * @since 1.0.0
   * 
   * @type {SidebarService} sidebarService
   */
  public readonly sidebarService: SidebarService = 
    inject<SidebarService>(SidebarService);

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
   * @type {Signal<SidebarGroup[]>} navigation
   */
  public readonly navigation: Signal<SidebarGroup[]> = signal<SidebarGroup[]>([
    {
      title: 'Général',
      items: [
        {
          label: 'Découvrir l\'application',
          icon: 'layout-dashboard',
          to: ''
        },
      ]
    },
    {
      title: 'Entreprise',
      items: [
        {
          label: 'Les entreprises',
          icon: 'building-2',
          to: '/companies'
        },
        {
          label: 'Appareils connectés',
          icon: 'radio',
          to: '/devices'
        },
        {
          label: 'Actionneurs',
          icon: 'arrow-big-up-dash',
          to: '/actuators'
        },
        {
          label: 'Audits',
          icon: 'scroll-text',
          to: '/companies/audits'
        }
      ]
    }
  ]);
  //#endregion
}
