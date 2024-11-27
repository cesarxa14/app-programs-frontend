import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers.component';
import { MyCustomersComponent } from './pages/my-customers/my-customers.component';
import { DetailCustomerComponent } from './pages/detail-customer/detail-customer.component';



const routes: Routes = [
  {
    path: '', 
    component: CustomersComponent,
    children: [
        { path: '', redirectTo: 'my-customers', pathMatch: 'full' },
        { path: 'my-customers'   , component: MyCustomersComponent},
        { path: 'my-customers/details/:id', component: DetailCustomerComponent},
    ]
  }
]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }