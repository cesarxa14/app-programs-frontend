import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router, private authService: AuthService){}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Obtener el token desde localStorage

    // Excluir rutas relacionadas con el módulo de auth
    if (request.url.includes('/auth')) {
        return next.handle(request); // No modificar estas solicitudes
    }

    const token = localStorage.getItem('token');

    // console.log('token: ', token)
    // Agregar el token al header si existe
    const authReq = token
      ? request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) })
      : request;
    // console.log('authReq', authReq)
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Token expirado o no autorizado
          console.error('Token vencido o inválido.');
          this.authService.logOut();
        }
        return throwError(error);
      })
    );
  }
}
