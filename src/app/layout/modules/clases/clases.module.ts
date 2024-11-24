import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClasesComponent } from './clases.component';
import { ClasesRoutingModule } from './clases-routing.module';

import {MatDialogModule} from '@angular/material/dialog';
import { AddProgramModalComponent } from './pages/programs/add-program-modal/add-program-modal.component';
import { ProgramsComponent } from './pages/programs/programs.component';
import { PackagesComponent } from './pages/packages/packages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditProgramModalComponent } from './pages/programs/edit-program-modal/edit-program-modal.component';
import { AddPackageModalComponent } from './pages/packages/add-package-modal/add-package-modal.component';
import { EditPackageModalComponent } from './pages/packages/edit-package-modal/edit-package-modal.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    ClasesComponent,
    AddProgramModalComponent,
    ProgramsComponent,
    PackagesComponent,
    EditProgramModalComponent,
    AddPackageModalComponent,
    EditPackageModalComponent
  ],
  imports: [
    CommonModule,
    ClasesRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    //MATERIAL
    MatDialogModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule
  ],
  entryComponents: [AddProgramModalComponent, EditProgramModalComponent],
})
export class ClasesModule { }
