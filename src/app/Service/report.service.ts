import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Report } from '../Models/report';
import { AdminReportPage } from '../Models/AdminReportPage';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  BASE_ADMIN_URL = "http://localhost:8080/admin/"

  constructor(private http : HttpClient) { }
  
  getAdminReport(page = 0): Observable<AdminReportPage>{
     return this.http.get<AdminReportPage>(this.BASE_ADMIN_URL+"report?page="+page);
  }

}
