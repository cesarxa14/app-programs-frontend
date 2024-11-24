import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CreateProgramDto } from '../interfaces/programs/ICreateProgramDto';
import { IEditProgramDto } from '../interfaces/programs/IEditProgramDto';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  private API_BASE_URI: string = environment.API_URI + 'programs'
  // private token = localStorage.getItem('token');
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

  getPrograms(){
    try{

      return this.http.get(this.API_BASE_URI, {headers: this.setHeaders()})
    }catch(err) {
      console.log('error: ', err)
      throw err
    }
  }

  createProgram(payloadCreate: CreateProgramDto){
    try{
      return this.http.post(this.API_BASE_URI, payloadCreate, {headers: this.setHeaders()})
    } catch (err) {
      console.log('error: ', err)
      throw err
    }
  }

  editProgram(payloadEdit: IEditProgramDto, id: number){
    try{
      return this.http.put(`${this.API_BASE_URI}/${id}`, payloadEdit)
    } catch (err) {
      console.log('error: ', err)
      throw err
    }
  }

  deleteProgram(id: number){
    try{
      return this.http.delete(`${this.API_BASE_URI}/${id}`)
    } catch (err) {
      console.log('error: ', err)
      throw err
    }
  }
}
