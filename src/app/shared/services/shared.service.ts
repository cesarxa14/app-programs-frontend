import { Injectable } from '@angular/core';
import {jwtDecode} from 'jwt-decode';
import { IJwtPayload } from '../interfaces/IJWTDecode';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private token: any;
  private idUser: any;
  private role: any;
  constructor() { }

  getToken(){
    const token = localStorage.getItem('token');
    if(token) this.token = token;
    return this.token;
  }

  getUserIdTokenParam(token: any){
    const decodedToken = jwtDecode<IJwtPayload>(token)
    console.log('decodedToken', decodedToken)
    //this.idUser = Number(decodedToken.id);
    this.idUser=decodedToken.id;
    return this.idUser;
  }

  getUserId() {
    const token = this.getToken();
    const decodedToken = jwtDecode<IJwtPayload>(token!)
    console.log('decodedToken', decodedToken)
    this.idUser = Number(decodedToken.id);
    return this.idUser;
  }

  getRoleId(){
    const role = localStorage.getItem('role');
    if(role)  this.role = role;
    else this.role = -1;
    return this.role;
  }

}
