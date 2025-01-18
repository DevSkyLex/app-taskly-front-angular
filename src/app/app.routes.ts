import { Routes } from '@angular/router';
import { CommonLayoutComponent } from '@layouts/common-layout/common-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: CommonLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('src/app/features/main/main.module').then(m => m.MainModule)     
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  }
];
