import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { LoginI } from '../../model/login.interface';
import { Router } from '@angular/router';
import { LoginResponseI } from '../../model/loginResponse.interface';

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

  constructor(private userService: UserService, private router: Router) { }

  errorStatus: boolean = false;
  errorCode: any;
  errorMessage: any = "";

  ngOnInit(): void {
    this.checkLocalStorage();
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

}
