import { Component, OnInit } from '@angular/core';
import { TaskI } from 'src/app/model/task.interface';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  tasks: TaskI[] = [];
  deleteResponse: any;

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
    this.taskService.deleteTask(task.task_id).subscribe(data => {
      console.log(data);
      this.deleteResponse = data;
    });
  }

}
