import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Report } from '../Models/report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  BASE_ADMIN_URL = "http://localhost:8080/admin/"

  constructor(private http : HttpClient) { }
  
  getAdminReport(): Observable<any>{
     return this.http.get<Report[]>(this.BASE_ADMIN_URL+"report");
  }

}
