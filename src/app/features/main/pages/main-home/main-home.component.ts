import { Component } from '@angular/core';
import { OnInit } from "@angular/core";
import { TaskService } from "@app/core/services/api/task.service";


@Component({
  selector: 'app-main-home',
  standalone: false,
  templateUrl: './main-home.component.html',
  styleUrl: './main-home.component.scss'
})

export class MainHomeComponent implements OnInit {
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
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    // this.loadTasks();
  }

  // loadTasks(): void {
  //   this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  // }

  addTask(): void {
    // Fonctionnalité à ajouter pour la gestion de l'ajout d'une tâche
    console.log('Ajout d\'une nouvelle tâche');
  }
}



