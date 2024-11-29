import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { StoreComponent } from './store.component';
import { StorePortalComponent } from './pages/store-portal/store-portal.component';



const routes: Routes = [
  {
    path: '', 
    component: StoreComponent,
    children: [
        { path: '', redirectTo: 'store-portal', pathMatch: 'full' },
        { path: 'store-portal'   , component: StorePortalComponent},
        // { path: 'packages'   , component: PackagesComponent},
    ]
  }
]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class StoreRoutingModule { }