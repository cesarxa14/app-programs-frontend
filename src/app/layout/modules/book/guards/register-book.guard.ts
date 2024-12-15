import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterBookGuard implements CanActivate {
  constructor(private sharedService: SharedService, private router: Router){}
  canActivate():  boolean  {
    const role = this.sharedService.getRoleId();

    if (role === '1') {
      this.router.navigate(['/home/admin']);
      return false;
    }

    if (role === '3') {
      this.router.navigate(['/home/customer']);
      return false;
    }
    return true;
  }
  
}
