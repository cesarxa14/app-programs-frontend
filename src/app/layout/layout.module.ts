import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { SidenavComponent } from '../shared/sidenav/sidenav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';


import { LayoutRoutingModule } from './layout-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';




@NgModule({
  declarations: [
    LayoutComponent,
    SidenavComponent
    // ClasesComponent,
    // AddProgramModalComponent,
    // ProgramsComponent,
    // PackagesComponent,
    // EditProgramModalComponent,
    // AddPackageModalComponent,
    // EditPackageModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    LayoutRoutingModule,
    //MATERIAL
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatPaginatorModule
  ],
  
  // entryComponents: [AddProgramModalComponent, EditProgramModalComponent],
})
export class LayoutModule { }
