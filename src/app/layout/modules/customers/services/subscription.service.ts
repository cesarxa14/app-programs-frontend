import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IExtendSubscription } from '../interfaces/IExtendSubscriptionDto';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  private API_BASE_URI: string = environment.API_URI + 'subscriptions'
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


  getSubscriptionByUser(idUser: string) {
    try{
      return this.http.get(`${this.API_BASE_URI}/byUser?userId=${idUser}` , {headers: this.setHeaders()})
    }catch(err) {
      console.log('error: ', err)
      throw err
    }
  }

  getSubscriptionValidByUser(idUser: number ) {
    try{
      return this.http.get(`${this.API_BASE_URI}/valid?userId=${idUser}` , {headers: this.setHeaders()})
    }catch(err) {
      console.log('error: ', err)
      throw err
    }
  }

  extendSubscription(id: number, payload: IExtendSubscription){
    try{
      return this.http.put(`${this.API_BASE_URI}/extendSubscription/${id}`, payload , {headers: this.setHeaders()})
    }catch(err) {
      console.log('error: ', err)
      throw err
    }
  }


}
