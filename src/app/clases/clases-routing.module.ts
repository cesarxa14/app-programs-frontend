import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { ClasesComponent } from './clases.component';
import { ProgramsComponent } from './pages/programs/programs.component';
import { PackagesComponent } from './pages/packages/packages.component';


const routes: Routes = [
  {
    path: '', 
    component: ClasesComponent,
    children: [
        { path: 'programs'   , component: ProgramsComponent},
        { path: 'packages'   , component: PackagesComponent},
    ]
  }
]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ClasesRoutingModule { }