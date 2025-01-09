import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private API_BASE_URI: string = environment.API_URI + 'reports'
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

  getQuantityStudent(){
    try{
      return this.http.get(`${this.API_BASE_URI}/getQuantityStudent`, {headers: this.setHeaders()})
    }catch(err) {
      console.log('error: ', err)
      throw err
    }
  }

  getStudentsByPrograms(){
    try{
      return this.http.get(`${this.API_BASE_URI}/getStudentsByPrograms`, {headers: this.setHeaders()})
    }catch(err) {
      console.log('error: ', err)
      throw err
    }
  }

  getStudentsByPackages(){
    try{
      return this.http.get(`${this.API_BASE_URI}/getStudentsByPackages`, {headers: this.setHeaders()})
    }catch(err) {
      console.log('error: ', err)
      throw err
    }
  }

  getEarningsByPackages(){
    try{
      return this.http.get(`${this.API_BASE_URI}/getEarningsByPackages`, {headers: this.setHeaders()})
    }catch(err) {
      console.log('error: ', err)
      throw err
    }
  }

  getEarningsByPrograms(){
    try{
      return this.http.get(`${this.API_BASE_URI}/getEarningsByPrograms`, {headers: this.setHeaders()})
    }catch(err) {
      console.log('error: ', err)
      throw err
    }
  }

  getUsersByGender(){
    try{
      return this.http.get(`${this.API_BASE_URI}/getUsersByGender`, {headers: this.setHeaders()})
    }catch(err) {
      console.log('error: ', err)
      throw err
    }
  }

  getUsersInfoDemographics(){
    try{
      return this.http.get(`${this.API_BASE_URI}/getUsersInfoDemographics`, {headers: this.setHeaders()})
    }catch(err) {
      console.log('error: ', err)
      throw err
    }
  }

  getSalesLineTime(){
    try{
      return this.http.get(`${this.API_BASE_URI}/getSalesLineTime`, {headers: this.setHeaders()})
    }catch(err) {
      console.log('error: ', err)
      throw err
    }
  }

  getTotalEarningSales(){
    try{
      return this.http.get(`${this.API_BASE_URI}/getTotalEarningSales`, {headers: this.setHeaders()})
    }catch(err) {
      console.log('error: ', err)
      throw err
    }
  }

  getSalesByTypeVoucher(){
    try{
      return this.http.get(`${this.API_BASE_URI}/getSalesByTypeVoucher`, {headers: this.setHeaders()})
    }catch(err) {
      console.log('error: ', err)
      throw err
    }
  }

  getSalesByPaymentMethod(){
    try{
      return this.http.get(`${this.API_BASE_URI}/getSalesByPaymentMethod`, {headers: this.setHeaders()})
    }catch(err) {
      console.log('error: ', err)
      throw err
    }
  }
  
}
