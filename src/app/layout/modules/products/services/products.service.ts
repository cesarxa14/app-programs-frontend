import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private API_BASE_URI: string = environment.API_URI + 'products'
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

  getMyProducts(idUser: number){
    try{
      return this.http.get(`${this.API_BASE_URI}/my-products?userId=${idUser}`, {headers: this.setHeaders()})
    }catch(err) {
      console.log('error: ', err)
      throw err
    }
  }
}
