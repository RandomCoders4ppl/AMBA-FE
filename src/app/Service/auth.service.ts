import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpclient: HttpClient) { }

  BASE_URL_AUTH = 'http://localhost:8080/auth/login'


  public login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders()
    headers.set('content-type', 'application/json')
    return this.httpclient.post(this.BASE_URL_AUTH, { 'email': email, 'password': password }, { headers: headers });
  }


}
