import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesComponent } from './sales.component';
import { SalesRoutingModule } from './sales-routing.module';

import { PanelSalesComponent } from './pages/panel-sales/panel-sales.component';
import { AddSaleModalComponent } from './pages/panel-sales/add-sale-modal/add-sale-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';



@NgModule({
  declarations: [
    SalesComponent,
    PanelSalesComponent,
    AddSaleModalComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    AutocompleteLibModule
  ]
})
export class SalesModule { }
