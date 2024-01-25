import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Project } from 'src/app/Models/project';
import { environment } from 'src/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProjectCardService {
  

  private url = `${environment.backend_api}/project/list`;

  constructor(private http : HttpClient) { }


  getAllProjects(){
    return this.http.get<Project[]>(this.url);
  }

  getAllProjectsNoImage(){
    return this.http.get<Project[]>(`${environment.backend_api}/project/list/noImage`)
  }

}
