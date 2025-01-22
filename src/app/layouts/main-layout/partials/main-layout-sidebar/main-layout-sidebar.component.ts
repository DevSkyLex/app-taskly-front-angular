import { CommonModule } from '@angular/common';
import { Component, signal, Signal } from '@angular/core';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { transition, trigger, useAnimation } from '@angular/animations';
import { AnimationTiming, AppAnimations } from '@shared/animations/app.animations';
import { environment } from '@env/environment';

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
          label: 'Tableau de bord',
          icon: 'layout-dashboard',
          items: [
            {
              label: 'Tableau de bord 1',
              to: '/dashboard'
            },
            {
              label: 'Tableau de bord 2',
              to: '/dashboard2'
            }
          ]
        },
        {
          label: 'Administration',
          to: '/admin',
          icon: 'settings',
          items: [
            {
              label: 'Utilisateurs',
              to: '/admin/users'
            },
            {
              label: 'Rôles',
              to: '/admin/roles'
            }
          ]
        },
      ]
    },
    {
      title: 'Administration',
      items: [
        {
          label: 'Journalisation',
          icon: 'scroll-text',
          items: [
            {
              label: 'Audit',
              to: '/audit'
            }
          ]
        },
        {
          label: 'Sécurité',
          icon: 'shield-check',
          items: [
            {
              label: 'Profil',
              to: '/profile'
            },
            {
              label: 'Mot de passe',
              to: '/password'
            }
          ]
        }
      ]
    }
  ]);
  //#endregion
}
