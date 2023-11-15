import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Auth } from '../Models/Auth';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpclient: HttpClient, private jwtHelper: JwtHelperService,private router: Router) { }

  BASE_URL_AUTH = 'http://localhost:8080/auth/'

  public UserAuth!: Auth
  
  public userSubj = new BehaviorSubject<User>({} as User);

  public User :User = {} as User;

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
    this.router.navigate(["/login"]);
    throw new Error("No Token Found")
  }

  public getExpirationDate(): boolean {
    const jwt = this.getJwtToken()
    if (jwt != null) {
      return this.jwtHelper.isTokenExpired(jwt);
    }
    localStorage.removeItem('token');
    this.router.navigate(["/login"]);
    return true;
  }

  public toLoginPage(){
    this.router.navigate(["/login"]);
  }

  public getRole() {
    const jwt = this.getJwtToken()
    if (jwt != null) {
      const decodedToken = this.jwtHelper.decodeToken(jwt)
      const role = decodedToken.roles;
      return role[0].authority;
    }
    return null;
  }

  public getUser() :Observable<User> {
    const jwt = this.getJwtToken()
    if (jwt != null) {
      const decodedToken = this.jwtHelper.decodeToken(jwt)
      this.User.name = decodedToken.name;
      this.User.emial = decodedToken.sub;
      this.User.role = this.getRole();
      console.log("User Name : "+this.User.emial+" And Name : "+this.User.name+" role : "+this.User.role)
      this.userSubj.next(this.User)
    }
    return this.userSubj.asObservable();
  }

  public getEmail(){
    const jwt = this.getJwtToken()
    if (jwt != null) {
      const decodedToken = this.jwtHelper.decodeToken(jwt)
      const email = decodedToken.sub;
      return email
    }
    return null;
  }

  clear() {
    localStorage.removeItem('token')
    this.router.navigate(["/login"]);
  }

  toProfilePage() {
   this.router.navigate(["/userProfile"]);
  }
}
