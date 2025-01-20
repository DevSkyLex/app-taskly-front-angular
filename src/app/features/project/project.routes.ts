import { Routes } from '@angular/router';
import { MainLayoutComponent } from '@layouts/main-layout/main-layout.component';
import { ProjectListComponent } from '@features/project/pages/project-list/project-list.component';
import { ProjectDetailsComponent } from '@features/project/pages/project-details/project-details.component';

export const routes: Routes = [
  {
    path: 'projects',
    component: MainLayoutComponent,
    data: {
      title: 'Projets',
      breadcrumb: 'Projets'
    },
    children: [
      {
        path: '',
        component: ProjectListComponent
      },
      {
        path: ':id',
        data: {
          title: 'Détails du projet',
          breadcrumb: 'Détails du projet'
        },
        component: ProjectDetailsComponent
      }
    ]
  }
];