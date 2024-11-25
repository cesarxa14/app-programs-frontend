import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyCustomerService {

  private API_BASE_URI: string = environment.API_URI + 'my-customers'
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


  getMyCustomers() {
    try{
      return this.http.get(this.API_BASE_URI, {headers: this.setHeaders()})
    }catch(err) {
      console.log('error: ', err)
      throw err
    }
  }
}
