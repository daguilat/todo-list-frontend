import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userLogged : Boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  checkLocalStorage(): Boolean{
    if(localStorage.getItem("token")){
      return true;
    }
    return false;
  }

  toDashboard(){
    this.router.navigate(["dashboard"]);
  }

  toAudit(){
    this.router.navigate(["audit"]);
  }

  exit(){
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    this.router.navigate(["login"]);
  }

}
