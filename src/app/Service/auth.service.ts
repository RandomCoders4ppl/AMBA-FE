import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from '../Models/Auth';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpclient: HttpClient, private jwtHelper: JwtHelperService) { }

  BASE_URL_AUTH = 'http://localhost:8080/auth/'

  public UserAuth!: Auth


  public login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders()
    headers.set('content-type', 'application/json')
    return this.httpclient.post(this.BASE_URL_AUTH + 'login', { 'email': email, 'password': password }, { headers: headers });
  }

  public SignUp(name: string, email: string, password: string): Observable<any> {
    const headers = new HttpHeaders()
    headers.set('content-type', 'application/json')
    return this.httpclient.post(this.BASE_URL_AUTH + "signUp", { 'name': name, 'email': email, 'password': password }, { headers: headers });
  }

  public isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

  public getJwtToken() {
    if (this.isLoggedIn())
      return localStorage.getItem('token');
    throw new Error("No Token Found")
  }

  public getExpirationDate(): boolean {
    const jwt = this.getJwtToken()
    if (jwt != null) {
      console.log(this.jwtHelper.getTokenExpirationDate(jwt))
      return this.jwtHelper.isTokenExpired(jwt);
    }
    return true;
  }

  public getRole() {
    const jwt = this.getJwtToken()
    if (jwt != null) {
      const decodedToken = this.jwtHelper.decodeToken(jwt)
      const role = decodedToken.roles;
      console.log(role)
      return role[0].authority;
    }
    return null;
  }

}
