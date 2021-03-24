import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { LoginI } from '../../model/login.interface';
import { Router } from '@angular/router';
import { LoginResponseI } from '../../model/loginResponse.interface';
import { UserI } from 'src/app/model/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm = new FormGroup({
    username : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required)
  })

  registerForm = new FormGroup({
    first_name : new FormControl('', Validators.required),
    last_name : new FormControl('', Validators.required),
    username : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required),
  })

  constructor(private userService: UserService, private router: Router) { }

  userRegistration : boolean = false;
  errorStatus: boolean = false;
  errorCode: any;
  errorMessage: any = "";

  ngOnInit(): void {
    this.checkLocalStorage();
  }

  registerButton(){
    this.userRegistration = true;
  }

  loginButton(){
    this.userRegistration = false;
  }

  checkLocalStorage(){
    if(localStorage.getItem("token")){
      this.router.navigate(["dashboard"]);
    }
  }

  onLogin(form: LoginI){
    this.userService.login(form).subscribe(data => {
      let dataResponse: LoginResponseI = data;
      if(dataResponse.status == "200"){
        localStorage.setItem("token", dataResponse.token);
        localStorage.setItem("user_id", dataResponse.user_id);
        this.router.navigate(["dashboard"]);
      } else {
        this.errorStatus = true;
        this.errorCode = dataResponse.status;
        this.errorMessage = dataResponse.message;
      }
    });
  }

  onRegister(form: UserI){
    this.userService.register(form).subscribe(data => {
      let dataResponse: LoginResponseI = data;
      if(dataResponse.status == "200"){
        localStorage.setItem("token", dataResponse.token);
        localStorage.setItem("user_id", dataResponse.user_id);
        this.router.navigate(["dashboard"]);
      } else {
        this.errorStatus = true;
        this.errorCode = dataResponse.status;
        this.errorMessage = dataResponse.message;
      }
    })
  }

}
