import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateProgramDto } from '../interfaces/programs/ICreateProgramDto';
import { IEditProgramDto } from '../interfaces/programs/IEditProgramDto';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  API_BASE_URI: string = environment.API_URI + 'programs'

  constructor(
    private http: HttpClient,
  ) { }

  createProgram(payloadCreate: CreateProgramDto){
    try{
      return this.http.post(this.API_BASE_URI, payloadCreate)
    } catch (err) {
      console.log('error: ', err)
      throw err
    }
  }

  editProgram(payloadEdit: IEditProgramDto){
    try{
      return this.http.put('api', payloadEdit)
    } catch (err) {
      console.log('error: ', err)
      throw err
    }
  }
}
