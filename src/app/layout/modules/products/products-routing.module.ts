import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';


import { ProductsComponent } from './products.component';
import { MyProductsComponent } from './pages/my-products/my-products.component';



const routes: Routes = [
  {
    path: '', 
    component: ProductsComponent,
    children: [
        { path: '', redirectTo: 'my-products', pathMatch: 'full' },
        { path: 'my-products'   , component: MyProductsComponent},
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
export class ProductsRoutingModule { }