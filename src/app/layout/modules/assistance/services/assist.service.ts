import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

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


}
