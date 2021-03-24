import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskI } from '../model/task.interface';



@Injectable({
  providedIn: 'root'
})
export class TaskService {

  url : string = "http://localhost:8080/todolist/task";

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  });

  constructor(private http: HttpClient) { }

  getAllTasks() : Observable<TaskI[]>{
    let dir = this.url + "/list";
    return this.http.get<TaskI[]>(dir, {headers: this.headers});

  }

  saveTask(task: TaskI){
    let dir = this.url + "/save/" + localStorage.getItem("user_id");
    return this.http.post(dir, task, {headers: this.headers});
  }

  deleteTask(task_id: number){
    let dir = this.url + "/delete/" + task_id + "/" + localStorage.getItem("user_id");
    return this.http.delete(dir, {headers: this.headers}); 
  }
}
