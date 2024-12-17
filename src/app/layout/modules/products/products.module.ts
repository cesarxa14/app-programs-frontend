import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { MyProductsComponent } from './pages/my-products/my-products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProductModalComponent } from './pages/my-products/add-product-modal/add-product-modal.component';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    ProductsComponent,
    MyProductsComponent,
    AddProductModalComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    MatPaginatorModule
  ]
})
export class ProductsModule { }
