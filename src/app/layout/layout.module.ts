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
import { ClasesComponent } from './modules/clases/clases.component';
import { AddProgramModalComponent } from './modules/clases/pages/programs/add-program-modal/add-program-modal.component';
import { ProgramsComponent } from './modules/clases/pages/programs/programs.component';
import { PackagesComponent } from './modules/clases/pages/packages/packages.component';
import { EditProgramModalComponent } from './modules/clases/pages/programs/edit-program-modal/edit-program-modal.component';
import { AddPackageModalComponent } from './modules/clases/pages/packages/add-package-modal/add-package-modal.component';
import { EditPackageModalComponent } from './modules/clases/pages/packages/edit-package-modal/edit-package-modal.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth/auth-interceptor';



@NgModule({
  declarations: [
    LayoutComponent,
    SidenavComponent,
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
    MatIconModule
  ],
  
  // entryComponents: [AddProgramModalComponent, EditProgramModalComponent],
})
export class LayoutModule { }
