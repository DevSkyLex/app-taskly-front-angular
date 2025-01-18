import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from '@features/main/main-routing.module';
import { MainHomeComponent } from '@features/main/pages/main-home/main-home.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [
    MainHomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MainRoutingModule
  ]
})
export class MainModule { }
