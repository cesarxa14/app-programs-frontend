import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  API_BASE_URI: string = environment.API_URI + 'roles'
  constructor(
    private http: HttpClient,
  ) { }

  getRoles() {
    return this.http.get(this.API_BASE_URI);
  }
}
