import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICreateHourDto } from '../pages/hours-setting/interfaces/ICreateHourDto';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private API_BASE_URI: string = environment.API_URI
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

  getHours(){
    try{
      return this.http.get(`${this.API_BASE_URI}hours`, {headers: this.setHeaders()})
    } catch(err) {
      console.log('err: ', err)
      throw err;
    }
  }

  createHour(payload: ICreateHourDto){
    try{
      return this.http.post(`${this.API_BASE_URI}hours`, payload, {headers: this.setHeaders()})
    } catch(err) {
      console.log('err: ', err)
      throw err;
    }
  }

  deleteHour(id: number){
    try{
      return this.http.delete(`${this.API_BASE_URI}hours/${id}`, {headers: this.setHeaders()})
    } catch(err) {
      console.log('err: ', err)
      throw err;
    }
  }
}
