import { Routes } from "@angular/router";
import { MainLayoutComponent } from "@layouts/main-layout/main-layout.component";
import { MainHomeComponent } from "@features/main/pages/main-home/main-home.component";

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        data: {
          title: 'Accueil',
          breadcrumb: 'Accueil'
        },
        component: MainHomeComponent
      }
    ]
  }
];