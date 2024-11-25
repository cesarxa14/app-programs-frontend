import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, Observable, shareReplay } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    // TODO: agregar lo del local storage
    role:any = localStorage.getItem('role') || 'Admin';
    displayName:any = `${localStorage.getItem('name')} ${localStorage.getItem('lastname')} ` || 'Cesar Torres'
  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    console.log('role: ', this.role)
    console.log('displayName: ', this.displayName)
  }

  logout(){
    this.authService.logOut()
  }

}
