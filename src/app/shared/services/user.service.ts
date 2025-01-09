import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_BASE_URI: string = environment.API_URI + 'users'
  constructor(
    private http: HttpClient,
  ) { }

  setHeaders(){
    const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
    });
    return headers
  }

  getUserById(idUser: any){
    try{
      return this.http.get(`${this.API_BASE_URI}/${idUser}`, {headers: this.setHeaders()})
    }catch(err) {
      console.log('error: ', err)
      throw err
    }
  }
  getUserByEmail(idUser: any){
    try{
      return this.http.get(`${this.API_BASE_URI}/getByEmail/${idUser}`, {headers: this.setHeaders()})
    }catch(err) {
      console.log('error: ', err)
      throw err
    }
  }
}
