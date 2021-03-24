import { trimTrailingNulls } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { TaskI } from 'src/app/model/task.interface';
import { UserI } from 'src/app/model/user.interface';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  
  taskStates: string[] = ["New Task", "In Progress", "Stuck", "Completed"];

  users: UserI[] = [];

  taskForm = this.formBuilder.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    username: ['', [Validators.required]],
    state: ['', [Validators.required]],
  })

  taskToSend: TaskI = history.state;

  userNotFound: Boolean = false;
  emptyUsername: Boolean = true;
  emptyDescription: Boolean = true;
  emptyTitle: Boolean = true;
  emptyState: Boolean = true;

  constructor(private router:Router, 
              private formBuilder:FormBuilder, 
              private taskService:TaskService,
              private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    });
    if(this.taskToSend.task_id != null){
      if(this.taskToSend.title){
        this.taskForm.controls['title'].setValue(this.taskToSend.title);
        this.emptyTitle = false;
      }
      if(this.taskToSend.description){
        this.taskForm.controls['description'].setValue(this.taskToSend.description);
        this.emptyDescription = false;
      }
      this.taskForm.controls['username'].setValue(this.taskToSend.user.username);
      this.emptyUsername = false;
      if(this.taskToSend.state){
        this.taskForm.controls['state'].setValue(this.taskToSend.state);
        this.emptyState = false;
      }
    }
    
  }

  validateUser(username: any) {
    this.userNotFound = false;
    if(username == ""){
      this.emptyUsername = true;
    } 
    else {
      this.emptyUsername = false;
      this.userNotFound = true;
      this.users.forEach(user => {
        if(username == user.username){
          this.userNotFound = false;
        }
      })
    }
  }

  validateTitle(title: any){
    if(title == ""){
      this.emptyTitle = true;
    } else {
      this.emptyTitle = false;
    }
  }

  validateState(state: any){
    if(state == ""){
      this.emptyState = true;
    } else {
      this.emptyState = false;
    }
  }

  validateDescription(description: any){
    if(description == ""){
      this.emptyDescription = true;
    } else {
      this.emptyDescription = false;
    }
  }

  saveTask(form: any){
    this.taskToSend.title = form.title;
    this.taskToSend.description = form.description;

    if(this.emptyState){
      this.taskToSend.state = "New Task";
    } else {
      this.taskToSend.state = form.state;
    }
    
    if(!this.emptyUsername){
      if(this.taskToSend.user){
        if(this.taskToSend.user.username != form.username){
          this.users.forEach(user => {
            if(user.username == form.username)
              this.taskToSend.user = user;
          });
        }
      } else {
        let task_user : UserI = {
          username : form.username,
          first_name : '',
          last_name : '',
          password: '',
        }
        this.taskToSend.user = task_user;
      }
    } else {
      let task_user : UserI = {
        username : '',
        first_name : '',
        last_name : '',
        password: '',
      }

      this.taskToSend.user = task_user;
    }

    if(!this.emptyTitle){
      this.taskService.saveTask(this.taskToSend).subscribe(data => {
        console.log(data);
        this.router.navigate(["dashboard"]);
      });
    } else {

    }

  }

  return(){
    this.router.navigate(["dashboard"]);
  }

}
