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
          label: 'Tableau de bord',
          icon: 'layout-dashboard',
          items: [
            { label: 'Tableau de bord 1', to: '/dashboard'},
            { label: 'Tableau de bord 2', to: '/dashboard2'},
            { label: 'Vue d’ensemble', to: '/dashboard/overview' },
            { label: 'Projets en cours', to: '/dashboard/projects' },
            { label: 'Statistiques', to: '/dashboard/stats' },
            { label: 'Calendrier', to: '/dashboard/calendar' },
            { label: 'Tâches', to: '/dashboard/tasks' }
          ]
        },
        {
          label: 'Administration',
          to: '/admin',
          icon: 'settings',
          items: [
            {
              label: 'Utilisateurs',
              icon: 'users',
              items: [
                { label: 'Gérer les utilisateurs', to: '/admin/users' },
                { label: 'Créer un utilisateur', to: '/admin/users/create' }
              ]
            },
            {
              label: 'Rôles',
              icon: 'shield',
              items: [
                { label: 'Gérer les rôles', to: '/admin/roles' },
                { label: 'Créer un rôle', to: '/admin/roles/create' }
              ]
            }
          ]
        },
        {
          label: 'Paramètres',
          to: '/admin',
          icon: 'settings',
        items: [
          { label: 'Préférences', to: '/settings/preferences', icon: 'settings' },
          { label: 'Notifications', to: '/settings/notifications', icon: 'bell' },
          { label: 'Gamification', to: '/settings/gamification', icon: 'award' }
        ]
      }
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
