
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MainRoutingModule } from '@features/main/main-routing.module';
import { MainDashboardComponent } from '@app/features/main/pages/main-dashboard/main-dashboard.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component';

@NgModule({
  declarations: [
    MainDashboardComponent,
    DashboardCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MainRoutingModule,
    ReactiveFormsModule
  ]
})
export class MainModule { }
