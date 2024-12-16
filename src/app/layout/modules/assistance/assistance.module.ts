import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssistanceComponent } from './assistance.component';
import { AssistanceRoutingModule } from './assistance-routing.module';
import { PanelAdminComponent } from './pages/panel-admin/panel-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { ModalAssistDetailComponent } from './pages/panel-admin/modal.assist-detail/modal.assist-detail.component';
import { HistorialAssistComponent } from './pages/historial-assist/historial-assist.component';



@NgModule({
  declarations: [
    AssistanceComponent,
    PanelAdminComponent,
    ModalAssistDetailComponent,
    HistorialAssistComponent,
  ],
  imports: [
    CommonModule,
    AssistanceRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    AutocompleteLibModule
  ]
})
export class AssistanceModule { }
