import { Routes } from "@angular/router";
import { MainLayoutComponent } from "@layouts/main-layout/main-layout.component";
import { MainDashboardComponent } from "@app/features/main/pages/main-dashboard/main-dashboard.component";
import { AuthGuard } from "@app/core/guards/auth.guard";

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        data: {
          title: 'Tableau de bord',
          breadcrumb: [
            { label: 'Tableau de bord', url: '/' }
          ]
        },
        component: MainDashboardComponent
      }
    ]
  }
];