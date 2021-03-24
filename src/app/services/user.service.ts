import { Injectable } from '@angular/core';
import { LoginI } from '../model/login.interface';
import { LoginResponseI } from '../model/loginResponse.interface';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserI } from '../model/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url : string = "http://localhost:8080/todolist/user";

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  });

  constructor(private http: HttpClient) { }

  login(form: LoginI): Observable<LoginResponseI>{
    let dir = this.url + "/login";
    return this.http.post<LoginResponseI>(dir, form);
  }

  register(form: UserI): Observable<LoginResponseI>{
    let dir = this.url + "/register";
    return this.http.post<LoginResponseI>(dir,form);
  }

  getAllUsers(){
    let dir = this.url + "/list";
    return this.http.get<UserI[]>(dir, {headers: this.headers});

  }

}
