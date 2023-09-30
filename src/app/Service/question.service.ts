import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Question} from '../Models/question'

@Injectable({
  providedIn: 'root'
})
export class QuestionService {


  constructor(private http : HttpClient) { }


  postNewQuestion(url:string,question : FormData): Observable<any>  {
    const headers  =  new HttpHeaders()
    headers.set('content-type', 'multipart/form-data')
    return this.http.post<any>(url,question,{headers:headers});
  }

}
