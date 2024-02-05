import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Report } from '../Models/report';
import { AdminReportPage } from '../Models/AdminReportPage';
import { environment } from 'src/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  

  BASE_ADMIN_URL = `${environment.backend_api}/admin/`

  constructor(private http : HttpClient) { }
  
  getAdminReport(page = 0): Observable<AdminReportPage>{
     return this.http.get<AdminReportPage>(this.BASE_ADMIN_URL+"report?page="+page);
  }

  getUserAnswerByProject(email:string,projectUuid:string){
    return this.http.get<[]>(this.BASE_ADMIN_URL+"answer?email="+email+'&prjID='+projectUuid);
  }

  getQuestion(email:string,questionUuid:string){
    return this.http.get<[]>(this.BASE_ADMIN_URL+"question?email="+email+'&questionUuid='+questionUuid);
  }

  downloadRespDocument(date: string) {
    const url = `${this.BASE_ADMIN_URL}downloadReport?date=`+date;
    return this.http.get(url,{responseType: "blob"});
  }

}
