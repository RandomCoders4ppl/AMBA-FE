import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  PROEJCT_BASE_URL = "http://localhost:8080/project"

  constructor(private http : HttpClient) { }
  
  saveNewProjectType(project : FormData):Observable<any>{
    const URL = this.PROEJCT_BASE_URL + "/new"
    const headers  =  new HttpHeaders()
    headers.set('content-type', 'multipart/form-data')
    return this.http.post<any>(URL,project,{headers:headers});
  }

}
