import { Injectable } from '@angular/core';
import {jwtDecode} from 'jwt-decode';
import { IJwtPayload } from '../interfaces/IJWTDecode';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private token: any;
  private idUser: any;
  constructor() { }

  getToken(){
    const token = localStorage.getItem('token');
    if(token) this.token = token;
    return this.token;
  }

  getUserId() {
    const token = this.getToken();
    const decodedToken = jwtDecode<IJwtPayload>(token!)
    console.log('decodedToken', decodedToken)
    this.idUser = Number(decodedToken.id);
    return this.idUser;

  }

}
