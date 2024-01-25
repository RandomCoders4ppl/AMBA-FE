import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectType } from '../Models/project_type';
import { environment } from 'src/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProjectTypesService {

  TYPES_BASE_URL = `${environment.backend_api}/projects/types`

  constructor(private http : HttpClient) { }

  getAllTypes():Observable<any>{
    const URL = this.TYPES_BASE_URL + '/list'
    return this.http.get<ProjectType>(URL);
  }
  
  saveNewProjectType(pType  : String):Observable<any>{
    const URL = this.TYPES_BASE_URL + "/new"
    return this.http.post(URL,pType,{
      responseType: 'text'
    });
  }

}
