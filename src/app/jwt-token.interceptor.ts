import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './Service/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {

  constructor(private JwtAuth : AuthService,private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  
    try{
    const JwtToken = this.JwtAuth.getJwtToken();
    if(this.JwtAuth.getExpirationDate()){
      this.router.navigate(["/login"]);
    }
    const JwtReq = request.clone({setHeaders: { 'Authorization': `Bearer ${JwtToken}`}})
    return next.handle(JwtReq);
    }catch(error){
      return next.handle(request);
    }
  }
}
