import { Component, OnInit } from '@angular/core';
import { mapResponseI } from 'src/app/model/mapResponse.interface';
import { TaskI } from 'src/app/model/task.interface';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  tasks: TaskI[] = [];
  deleteError : boolean = false;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getAllTasks().subscribe(data => {
      this.tasks = data;
    });
  }

  addTask() {
    
  }

  editTask(task: TaskI) {
  }

  deleteTask(task: TaskI) {
    let task_id = task.task_id;
    this.taskService.deleteTask(task_id).subscribe(data => {
      let dataResponse: any = data;
      if(dataResponse.status != "200"){
        this.deleteError = false;
      }
      let refreshTasks: TaskI[] = [];
      this.tasks.forEach((task) => {
        if(task.task_id == task_id){}
        else refreshTasks.push(task);
      });
      this.tasks = refreshTasks;
    });

  }

}
