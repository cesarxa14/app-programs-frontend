import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

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

  getQuantityStudent(startDate: string, endDate: string){
    try{
      return this.http.get(`${this.API_BASE_URI}/getQuantityStudent?startDate=${startDate}&endDate=${endDate}`, {headers: this.setHeaders()})
    }catch(err) {
      console.log('error: ', err)
      throw err
    }
  }

  getStudentsByPrograms(startDate: string, endDate: string){
    try{
      console.log({startDate, endDate})
      return this.http.get(`${this.API_BASE_URI}/getStudentsByPrograms?startDate=${startDate}&endDate=${endDate}`, {headers: this.setHeaders()})
    }catch(err) {
      console.log('error: ', err)
      throw err
    }
  }

  getStudentsByPackages(startDate: string, endDate: string){
    try{
      return this.http.get(`${this.API_BASE_URI}/getStudentsByPackages?startDate=${startDate}&endDate=${endDate}`, {headers: this.setHeaders()})
    }catch(err) {
      console.log('error: ', err)
      throw err
    }
  }

  getEarningsByPackages(startDate: string, endDate: string){
    try{
      return this.http.get(`${this.API_BASE_URI}/getEarningsByPackages?startDate=${startDate}&endDate=${endDate}`, {headers: this.setHeaders()})
    }catch(err) {
      console.log('error: ', err)
      throw err
    }
  }

  getEarningsByPrograms(startDate: string, endDate: string){
    try{
      return this.http.get(`${this.API_BASE_URI}/getEarningsByPrograms?startDate=${startDate}&endDate=${endDate}`, {headers: this.setHeaders()})
    }catch(err) {
      console.log('error: ', err)
      throw err
    }
  }

  getUsersByGender(startDate: string, endDate: string){
    try{
      return this.http.get(`${this.API_BASE_URI}/getUsersByGender?startDate=${startDate}&endDate=${endDate}`, {headers: this.setHeaders()})
    }catch(err) {
      console.log('error: ', err)
      throw err
    }
  }

  getUsersInfoDemographics(startDate: string, endDate: string){
    try{
      return this.http.get(`${this.API_BASE_URI}/getUsersInfoDemographics?startDate=${startDate}&endDate=${endDate}`, {headers: this.setHeaders()})
    }catch(err) {
      console.log('error: ', err)
      throw err
    }
  }

  getSalesLineTime(startDate: string, endDate: string){
    try{
      return this.http.get(`${this.API_BASE_URI}/getSalesLineTime?startDate=${startDate}&endDate=${endDate}`, {headers: this.setHeaders()})
    }catch(err) {
      console.log('error: ', err)
      throw err
    }
  }

  getTotalEarningSales(startDate: string, endDate: string){
    try{
      return this.http.get(`${this.API_BASE_URI}/getTotalEarningSales?startDate=${startDate}&endDate=${endDate}`, {headers: this.setHeaders()})
    }catch(err) {
      console.log('error: ', err)
      throw err
    }
  }

  getSalesByTypeVoucher(startDate: string, endDate: string){
    try{
      return this.http.get(`${this.API_BASE_URI}/getSalesByTypeVoucher?startDate=${startDate}&endDate=${endDate}`, {headers: this.setHeaders()})
    }catch(err) {
      console.log('error: ', err)
      throw err
    }
  }

  getSalesByPaymentMethod(startDate: string, endDate: string){
    try{
      return this.http.get(`${this.API_BASE_URI}/getSalesByPaymentMethod?startDate=${startDate}&endDate=${endDate}`, {headers: this.setHeaders()})
    }catch(err) {
      console.log('error: ', err)
      throw err
    }
  }
  
}
