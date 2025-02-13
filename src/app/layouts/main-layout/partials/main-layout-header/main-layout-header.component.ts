import { OverlayModule } from '@angular/cdk/overlay';
import { Component, inject } from '@angular/core';
import { SidebarService } from '@app/shared/services/sidebar.service';
import { Store } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';
import { Observable } from 'rxjs';
import { User } from '@app/core/models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-layout-header',
  imports: [SharedModule, OverlayModule, CommonModule],
  templateUrl: './main-layout-header.component.html',
  styleUrl: './main-layout-header.component.scss',
})
export class MainLayoutHeaderComponent {
  //#region Propriétés
  /**
   * Propriété sidebarService
   * @readonly
   * 
   * Service de la barre latérale
   * 
   * @access public
   * @memberof MainLayoutHeaderComponent
   * @since 1.0.0
   * 
   * @type {SidebarService} sidebarService
   */
  public readonly sidebarService: SidebarService = 
    inject<SidebarService>(SidebarService);

  /**
   * Propriété store
   * @readonly
   * 
   * Store de l'application
   * 
   * @access public
   * @memberof MainLayoutHeaderComponent
   * @since 1.0.0
   * 
   * @type {Store} store
   */
  private readonly store: Store = 
    inject<Store>(Store);
  //#endregion
}
