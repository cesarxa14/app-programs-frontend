import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ILoginDto } from '../interfaces/ILoginDto';
import { ICreateUserFirstStep } from '../interfaces/ICreateUserFirstStepDto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_BASE_URI: string = environment.API_URI + 'auth'
  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  // METODO PARA INICIAR SESIÓN
  signIn(payloadLogin: ILoginDto){
    return this.http.post(this.API_BASE_URI + '/login', payloadLogin);
  }

  register(payloadRegister: ICreateUserFirstStep){
    return this.http.post(this.API_BASE_URI + 'register', payloadRegister)
  }

  logOut() {
    // return this.afAuth.signOut().then(() => {
    //   localStorage.removeItem('user');
    //   localStorage.removeItem('role');
    //   localStorage.removeItem('email');
    //   localStorage.removeItem('idUser');
    //   localStorage.removeItem('displayName');
    //   this.router.navigateByUrl('auth/login');
    // });
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('name')
    localStorage.removeItem('latname')

    this.router.navigateByUrl('auth/login');

}
}