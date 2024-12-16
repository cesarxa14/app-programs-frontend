import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from '../services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardGuard implements CanActivate {
  idRole: any;
  constructor(private sharedService: SharedService, private router: Router){
    this.idRole = sharedService.getRoleId();
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.idRole == '3'){
        console.log('idRole: ', this.idRole)
        if(state.url.includes('/pages/clases') || state.url.includes('/pages/sales') || state.url.includes('/pages/customer')){
          this.router.navigate(['/pages/books']);

        }
      }
      // console.log(route)
      // console.log(state)
    return true;
  }
  
}
