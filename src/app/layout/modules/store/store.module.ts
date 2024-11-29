import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { StoreRoutingModule } from './store-routing.module';
import { StorePortalComponent } from './pages/store-portal/store-portal.component';
import { ModalAddCarComponent } from './pages/store-portal/modal-add-car/modal-add-car.component';



@NgModule({
  declarations: [
    StoreComponent,
    StorePortalComponent,
    ModalAddCarComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule
  ]
})
export class StoreModule { }
