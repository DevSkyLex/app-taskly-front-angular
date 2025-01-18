import { Component } from '@angular/core';
import { MainLayoutHeaderComponent } from '@layouts/main-layout/partials/main-layout-header/main-layout-header.component';
import { MainLayoutSidebarComponent } from '@layouts/main-layout/partials/main-layout-sidebar/main-layout-sidebar.component';
import { MainLayoutContentComponent } from '@layouts/main-layout/partials/main-layout-content/main-layout-content.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [
    MainLayoutHeaderComponent,
    MainLayoutSidebarComponent,
    MainLayoutContentComponent,
    RouterModule
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {}
