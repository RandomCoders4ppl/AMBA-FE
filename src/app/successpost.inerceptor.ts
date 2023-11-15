import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Injectable()
export class PostSuccessInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) {}

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
        tap(event => {
          if (event instanceof HttpResponse && event.ok && (req.method === 'POST' || req.method === 'PUT')) {
            this.snackBar.open('Successful POST','close',{
                duration: 5000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                panelClass:['my-custom-snackbar2'],
              });
          }
        })
      );
  }
}
