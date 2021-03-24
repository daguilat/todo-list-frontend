import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskI } from 'src/app/model/task.interface';
import { UserI } from 'src/app/model/user.interface';
import { UserService } from 'src/app/services/user.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  users: UserI[] = [];
  tasks: TaskI[] = [];
  deleteError : boolean = false;
  closeResult = '';

  constructor(private taskService: TaskService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.taskService.getAllTasks().subscribe(data => {
      this.tasks = data;
    });

    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }

  createTask(){
    this.router.navigate(["edit-task"]);
  }

  editTask(task: TaskI){
    this.router.navigate(["edit-task"], {state: task});
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
