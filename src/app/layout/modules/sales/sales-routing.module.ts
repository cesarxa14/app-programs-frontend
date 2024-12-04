import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { SalesComponent } from './sales.component';
import { PanelSalesComponent } from './pages/panel-sales/panel-sales.component';



const routes: Routes = [
  {
    path: '', 
    component: SalesComponent,
    children: [
        { path: '', redirectTo: 'panel-sales', pathMatch: 'full' },
        { path: 'panel-sales'   , component: PanelSalesComponent},
        // { path: 'my-customers/details/:id', component: DetailCustomerComponent},
    ]

  }
]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SalesRoutingModule { }