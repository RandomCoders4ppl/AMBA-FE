import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from '../Models/Auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpclient: HttpClient) { }

  BASE_URL_AUTH = 'http://localhost:8080/auth/'

  public UserAuth! : Auth


  public login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders()
    headers.set('content-type', 'application/json')
    return this.httpclient.post(this.BASE_URL_AUTH + 'login', { 'email': email, 'password': password }, { headers: headers });
  }

  public SignUp(name:string ,email : string, password: string): Observable<any>{
    const headers = new HttpHeaders()
    headers.set('content-type', 'application/json')
    return this.httpclient.post(this.BASE_URL_AUTH +"signUp", { 'name':name,'email': email, 'password': password }, { headers: headers });
  }

  public isLoggedIn(){
    return localStorage.getItem('token')!==null;
  }

  public getJwtToken(){
    if(this.isLoggedIn())
        return localStorage.getItem('token');
    throw new Error("No Token Found")
  }


}
