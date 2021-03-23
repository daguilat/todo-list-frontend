import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskI } from '../model/task.interface';



@Injectable({
  providedIn: 'root'
})
export class TaskService {

  url : string = "http://localhost:8080/todolist/task";

  constructor(private http: HttpClient) { }

  getAllTasks() : Observable<TaskI[]>{
    let dir = this.url + "/list/" + localStorage.getItem("user_id");
    return this.http.get<TaskI[]>(dir);

  }

  deleteTask(task_id: number){
    let dir = this.url + "/delete/" + task_id + "/" + localStorage.getItem("user_id");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    })
    return this.http.delete(dir, {headers: headers}); 
  }
}
