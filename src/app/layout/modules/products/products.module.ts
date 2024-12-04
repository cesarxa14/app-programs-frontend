import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { MyProductsComponent } from './pages/my-products/my-products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProductsComponent,
    MyProductsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
  ]
})
export class ProductsModule { }
