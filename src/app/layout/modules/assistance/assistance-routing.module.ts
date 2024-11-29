import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AssistanceComponent } from './assistance.component';
import { PanelAdminComponent } from './pages/panel-admin/panel-admin.component';



const routes: Routes = [
  {
    path: '', 
    component: AssistanceComponent,
    children: [
        { path: '', redirectTo: 'panel-admin', pathMatch: 'full' },
        { path: 'panel-admin'   , component: PanelAdminComponent},
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
export class AssistanceRoutingModule { }