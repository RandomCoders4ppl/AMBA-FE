import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './Service/auth.service';

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {

  constructor(private JwtAuth : AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  
    try{
    const JwtToken = this.JwtAuth.getJwtToken();
    
    const JwtReq = request.clone({setHeaders: { 'Authorization': `Bearer ${JwtToken}`}})
    console.log(JwtReq)
    return next.handle(JwtReq);
    }catch(error){
      return next.handle(request);
    }
  }
}
