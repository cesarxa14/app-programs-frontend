import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICreateSaleDto } from '../interfaces/ICreateSaleDto';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  private API_BASE_URI: string = environment.API_URI + 'sales'
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

  getMySales(idSeller: number){
    try{
      return this.http.get(`${this.API_BASE_URI}/my-sales?sellerId=${idSeller}`, {headers: this.setHeaders()})
    }catch(err) {
      console.log('error: ', err)
      throw err
    }
  }

  createSale(payload: ICreateSaleDto){
    try{
      return this.http.post(`${this.API_BASE_URI}`, payload, {headers: this.setHeaders()})
    }catch(err) {
      console.log('error: ', err)
      throw err
    }
  }
}
