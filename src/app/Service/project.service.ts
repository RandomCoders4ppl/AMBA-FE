import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  PROEJCT_BASE_URL = `${environment.backend_api}/project`

  constructor(private http : HttpClient) { }
  
  saveNewProjectType(project : FormData):Observable<any>{
    const URL = this.PROEJCT_BASE_URL + "/new"
    const headers  =  new HttpHeaders()
    headers.set('content-type', 'multipart/form-data')
    return this.http.post(URL,project,{headers:headers,responseType:'text'});
  }

}
