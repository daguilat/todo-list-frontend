import { Injectable } from '@angular/core';
import { LoginI } from '../model/login.interface';
import { LoginResponseI } from '../model/loginResponse.interface';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url : string = "http://localhost:8080/todolist/user";

  constructor(private http: HttpClient) { }

  login(form: LoginI): Observable<LoginResponseI>{
    let dir = this.url + "/login";
    return this.http.post<LoginResponseI>(dir, form);
  }
}
