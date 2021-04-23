import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from './task';
import { TASKS } from './tasks-mock';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
   providedIn: 'root'
})
export class TaskService {

   private tasksUrl = 'https://localhost:5001/api/task';  // URL to web api

   constructor(private messageService: MessageService, private http: HttpClient) { }

   httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };

   getTasks(): Observable<Task[]> {
      //const tasks = of(TASKS);
      const tasks = this.http.get<Task[]>(this.tasksUrl)
         .pipe(
            tap(_ => this.log('fetched tasks')),
            catchError(this.handleError<Task[]>('getTasks', []))
         );
      return tasks;
   }

   getTask(id: number): Observable<Task> {
      const url = `${this.tasksUrl}/${id}`;
      const task = this.http.get<Task>(url)
         .pipe(
            tap(_ => this.log('fetched tasks')),
            catchError(this.handleError<Task>(`getTask id=${id}`))
         );
      return task;
   }

   updateTask(task: Task): Observable<any> {
      const url = `${this.tasksUrl}/${task.id}`;
      return this.http.put(url, task, this.httpOptions)
         .pipe(
            tap(_ => this.log(`update Task id=${task.id}`)),
            catchError(this.handleError<any>('update Task'))
         );
   }

   private log(message: string) {
      this.messageService.add(`TaskService: ${message}`);
   }

   /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
   private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {

         // TODO: send the error to remote logging infrastructure
         console.error(error); // log to console instead

         // TODO: better job of transforming error for user consumption
         this.log(`${operation} failed: ${error.message}`);

         // Let the app keep running by returning an empty result.
         return of(result as T);
      };
   }
}
