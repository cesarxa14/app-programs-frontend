import { Injectable } from '@angular/core';
import { ICreateBookDto } from '../interfaces/ICreateBookDto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private API_BASE_URI: string = environment.API_URI + 'books'
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

  getMyBooks() {
    try{
      return this.http.get(this.API_BASE_URI, {headers: this.setHeaders()})
    }catch(err) {
      console.log('error: ', err)
      throw err
    }
  }

  createBook(payloadCreate: ICreateBookDto) {
    try{
      return this.http.post(this.API_BASE_URI, payloadCreate ,{headers: this.setHeaders()})
    }catch(err) {
      console.log('error: ', err)
      throw err
    }
  }
}
