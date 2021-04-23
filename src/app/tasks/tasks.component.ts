import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { MessageService } from '../message.service';

@Component({
   selector: 'app-tasks',
   templateUrl: './tasks.component.html',
   styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

   tasks: Task[] = [];

   selectedTask?: Task;

   constructor(private taskService: TaskService, private messageService: MessageService) {

   }

   ngOnInit(): void {
      this.getTasks();
   }

   /*onSelect(task: Task): void {
      this.selectedTask = task;
      this.messageService.add(`HeroesComponent: Selected hero id=${task.id}`);
   }*/

   getTasks(): void {
      this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
   }
}
