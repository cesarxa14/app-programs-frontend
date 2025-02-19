import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgApexchartsModule,
    FormsModule, 
    ReactiveFormsModule,
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
