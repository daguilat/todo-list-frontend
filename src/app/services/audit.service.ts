import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuditI } from '../model/audit.interface';

@Injectable({
  providedIn: 'root'
})
export class AuditService {

  url : string = "http://localhost:8080/todolist/audit";

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  });

  constructor(private http: HttpClient) { }

  getAllAudits() : Observable<AuditI[]>{
    let dir = this.url + "/list";
    return this.http.get<AuditI[]>(dir, {headers: this.headers});

  }
}
