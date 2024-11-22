import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICreatePackageDto } from '../interfaces/packages/ICreatePackageDto';
import { IEditPackageDto } from '../interfaces/packages/IEditPackageDto';
import {environment} from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PackageService {

  API_BASE_URI: string = environment.API_URI + 'packages'
  constructor(
    private http: HttpClient,
  ) { }

  getPackages(){
    try{
      return this.http.get(this.API_BASE_URI)
    }catch(err) {
      console.log('error: ', err)
      throw err
    }
  }

  createPackage(payloadCreate: ICreatePackageDto){
    try{
      return this.http.post(this.API_BASE_URI, payloadCreate)
    } catch (err) {
      console.log('error: ', err)
      throw err
    }
  }

  editPackage(payloadEdit: IEditPackageDto){
    try{
      return this.http.put('api', payloadEdit)
    } catch (err) {
      console.log('error: ', err)
      throw err
    }
  }
}
