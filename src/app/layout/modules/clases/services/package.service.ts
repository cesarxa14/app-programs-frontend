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

  getPackages(idUser: number){
    try{
      return this.http.get(`${this.API_BASE_URI}?userId=${idUser}`)
    }catch(err) {
      console.log('error: ', err)
      throw err
    }
  }

  
  getNumClassesByUser(idUser: number){
    try{
      return this.http.get(`${this.API_BASE_URI}/getNumClassesByUser?userId=${idUser}`)
    }catch(err) {
      console.log('error: ', err)
      throw err
    }
  }

  getPackagesEnables(idUser: number){
    try{
      return this.http.get(`${this.API_BASE_URI}/enables?userId=${idUser}`)
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

  editPackage(payloadEdit: IEditPackageDto, id: number){
    try{
      return this.http.put(`${this.API_BASE_URI}/${id}`, payloadEdit)
    } catch (err) {
      console.log('error: ', err)
      throw err
    }
  }

  deletePackage(id: number){
    try{
      return this.http.delete(`${this.API_BASE_URI}/${id}`)
    } catch (err) {
      console.log('error: ', err)
      throw err
    }
  }
}
