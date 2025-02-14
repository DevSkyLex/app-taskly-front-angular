import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  standalone: false,
  
  templateUrl: './dashboard-card.component.html',
  styleUrl: './dashboard-card.component.scss'
})
export class DashboardCardComponent implements OnInit {
  activeProjects: number = 5;  
  teamMembers: number = 12;   
  nextDeadline: string = '15 février 2025'; 
  completedTasks: number = 45;  
  tasks = [
    { title: 'Tâche 1', description: 'Lorem ipsum dolor sit amet', assignedTo: 'Alice' },
    { title: 'Tâche 2', description: 'Consectetur adipiscing elit', assignedTo: 'Bob' },
    { title: 'Tâche 3', description: 'Sed do eiusmod tempor incididunt', assignedTo: 'Charlie' },
    { title: 'Tâche 4', description: 'Lorem ipsum dolor sit amet', assignedTo: 'Alice' },
    { title: 'Tâche 5', description: 'Consectetur adipiscing elit', assignedTo: 'Bob' },
    { title: 'Tâche 6', description: 'Sed do eiusmod tempor incididunt', assignedTo: 'Charlie' },
  ];
  
  constructor() {}

  public ngOnInit(): void {
  }
}
