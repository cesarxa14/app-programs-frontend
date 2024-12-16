import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { MyCustomersComponent } from './pages/my-customers/my-customers.component';
import { DetailCustomerComponent } from './pages/detail-customer/detail-customer.component';
import { AddMyCustomerModalComponent } from './pages/my-customers/add-my-customer-modal/add-my-customer-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditMyCustomerModalComponent } from './pages/my-customers/edit-my-customer-modal/edit-my-customer-modal.component';
import { ModalExtendSubscriptionComponent } from './pages/detail-customer/modal-extend-subscription/modal-extend-subscription.component';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [
    CustomersComponent,
    MyCustomersComponent,
    DetailCustomerComponent,
    AddMyCustomerModalComponent,
    EditMyCustomerModalComponent,    
    ModalExtendSubscriptionComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    MatPaginatorModule
  ]
})
export class CustomersModule { }
