import { Routes } from "@angular/router";
import { AuthLoginComponent } from "@features/auth/pages/auth-login/auth-login.component";
import { AuthLayoutComponent } from "@layouts/auth-layout/auth-layout.component";
import { AuthRegisterComponent } from "./pages/auth-register/auth-register.component";

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        data: {
          title: 'Connexion',
          breadcrumb: 'Connexion'
        },
        component: AuthLoginComponent
      },
      {
        path: 'register',
        data: {
          title: 'Inscription',
          breadcrumb: 'Inscription'
        },
        component: AuthRegisterComponent
      }
    ]
  }
];