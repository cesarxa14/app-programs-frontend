import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICreateProductDto } from '../interfaces/ICreateProductDto';

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

  getProducts(){
    try{
      return this.http.get(`${this.API_BASE_URI}`, {headers: this.setHeaders()})
    }catch(err) {
      console.log('error: ', err)
      throw err
    }
  }

  getMyProducts(idUser: number){
    try{
      return this.http.get(`${this.API_BASE_URI}/my-products?userId=${idUser}`, {headers: this.setHeaders()})
    }catch(err) {
      console.log('error: ', err)
      throw err
    }
  }

  createProduct(payloadCreate: ICreateProductDto){
    try{
      return this.http.post(this.API_BASE_URI, payloadCreate)
    } catch (err) {
      console.log('error: ', err)
      throw err
    }
  }

  deleteProduct(id: number){
    try{
      return this.http.delete(`${this.API_BASE_URI}/${id}`)
    } catch (err) {
      console.log('error: ', err)
      throw err
    }
  }
}
