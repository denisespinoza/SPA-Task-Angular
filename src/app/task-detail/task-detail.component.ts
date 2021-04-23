import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TaskService } from '../task.service';
import { Task } from '../task';

@Component({
   selector: 'app-task-detail',
   templateUrl: './task-detail.component.html',
   styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {

   @Input()
   task?: Task;

   constructor(
      private route: ActivatedRoute,
      private taskService: TaskService,
      private location: Location
   ) { }

   ngOnInit(): void {
      this.getHero();
   }

   getHero(): void {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.taskService.getTask(id).subscribe(task => this.task = task);
   }

   goBack() {
      this.location.back();
   }

   save() {
      this.taskService.updateTask(this.task).subscribe(() => this.goBack());
   }
}
