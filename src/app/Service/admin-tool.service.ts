import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../Models/Users';
import { AdminReqType } from '../Models/AdminReqType';



@Injectable({
  providedIn: 'root'
})
export class AdminToolService {

  BASE_URL_ADMIN = "http://localhost:8080/admin"

  constructor(private http : HttpClient) { }
  
 

  getUsersByRole(role : string) : Observable<Users[]>{
    return this.http.get<Users[]>(this.BASE_URL_ADMIN+'/getUserByType?role='+role)
  }
 
  postChanges(actionUrl:string,list : AdminReqType[]):Observable<AdminReqType[]>{
   return this.http.post<AdminReqType[]>(this.BASE_URL_ADMIN+actionUrl,list)
  }

}
