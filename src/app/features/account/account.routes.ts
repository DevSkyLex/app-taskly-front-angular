import { Routes } from "@angular/router";
import { MainLayoutComponent } from "@layouts/main-layout/main-layout.component";
import { AccountProfileComponent } from "@features/account/pages/account-profile/account-profile.component";

export const routes: Routes = [
  {
    path: 'account',
    component: MainLayoutComponent,
    children: [
      {
        path: 'profile',
        data: {
          title: 'Mon profil',
          breadcrumb: 'Mon profil'
        },
        component: AccountProfileComponent
      }
    ]
  }
];