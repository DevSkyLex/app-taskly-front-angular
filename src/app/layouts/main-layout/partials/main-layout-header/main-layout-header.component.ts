import { OverlayModule } from '@angular/cdk/overlay';
import { Component, inject } from '@angular/core';
import { SidebarService } from '@app/shared/services/sidebar.service';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-main-layout-header',
  imports: [SharedModule, OverlayModule],
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
  //#endregion
}
