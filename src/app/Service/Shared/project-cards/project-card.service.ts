import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Project } from 'src/app/Models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectCardService {
  

  private url = "http://localhost:8080/project/list";

  constructor(private http : HttpClient) { }


  getAllProjects(){
    return this.http.get<Project[]>(this.url);
  }

  getAllProjectsNoImage(){
    return this.http.get<Project[]>("http://localhost:8080/project/list/noImage")
  }

}
