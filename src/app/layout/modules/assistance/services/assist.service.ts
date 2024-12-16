import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICreateAssistDto } from '../interfaces/ICreateAssistDto';

@Injectable({
  providedIn: 'root'
})
export class AssistService {

  private API_BASE_URI: string = environment.API_URI + 'assists'
  constructor(
    private http: HttpClient,
  ) { }

  private setHeaders(){
    const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
    });
    return headers
  }

  getAssistsByUserPackages(idUser: number) {
    try{
      return this.http.get(`${this.API_BASE_URI}/getAssistsByUserPackages?userId=${idUser}`, {headers: this.setHeaders()})
    }catch(err) {
      console.log('error: ', err)
      throw err
    }
  }

  getAssistByAdmin(idUser: number){
    try{
      return this.http.get(`${this.API_BASE_URI}/byAdmin?userId=${idUser}`, {headers: this.setHeaders()})
    }catch(err) {
      console.log('error: ', err)
      throw err
    }
  }

  getAssistByCustomer(idUser: number){
    try{
      return this.http.get(`${this.API_BASE_URI}/byCustomer?userId=${idUser}`, {headers: this.setHeaders()})
    }catch(err) {
      console.log('error: ', err)
      throw err
    }
  }

  createAssist(payloadCreate: ICreateAssistDto) {
    try{
      return this.http.post(this.API_BASE_URI, payloadCreate ,{headers: this.setHeaders()})
    }catch(err) {
      console.log('error: ', err)
      throw err
    }
  }


}
