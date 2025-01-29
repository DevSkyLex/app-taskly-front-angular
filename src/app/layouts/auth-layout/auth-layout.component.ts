import { Component } from '@angular/core';
import { AuthLayoutHeaderComponent } from '@layouts/auth-layout/partials/auth-layout-header/auth-layout-header.component';
import { AuthLayoutFooterComponent } from '@layouts/auth-layout/partials/auth-layout-footer/auth-layout-footer.component';
import { AuthLayoutContentComponent } from '@layouts/auth-layout/partials/auth-layout-content/auth-layout-content.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  imports: [
    AuthLayoutHeaderComponent, 
    AuthLayoutFooterComponent, 
    AuthLayoutContentComponent,
    RouterModule
  ],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {

}
