import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Project } from '@app/core/models/project.model';
import { ProjectState } from '@app/core/stores/project/project.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAllProjects, selectLoading, selectProjectTotal } from '@app/core/stores/project/project.selectors';
import { loadProjects } from '@app/core/stores/project/project.actions';


@Component({
  selector: 'app-main-dashboard',
  standalone: false,
  templateUrl: './main-dashboard.component.html',
  styleUrl: './main-dashboard.component.scss'
})
export class MainDashboardComponent {
}



