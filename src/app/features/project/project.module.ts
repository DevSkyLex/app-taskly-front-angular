import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectRoutingModule } from '@features/project/project-routing.module';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { ProjectDetailsComponent } from './pages/project-details/project-details.component';
import { SharedModule } from "../../shared/shared.module";
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectAddFormComponent } from './forms/project-add-form/project-add-form.component';


@NgModule({
  declarations: [
    ProjectListComponent,
    ProjectDetailsComponent,
    ProjectCardComponent,
    ProjectAddFormComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    SharedModule,
    ReactiveFormsModule
]
})
export class ProjectModule { }
