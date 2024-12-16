import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AssistanceComponent } from './assistance.component';
import { PanelAdminComponent } from './pages/panel-admin/panel-admin.component';
import { HistorialAssistComponent } from './pages/historial-assist/historial-assist.component';



const routes: Routes = [
  {
    path: '', 
    component: AssistanceComponent,
    children: [
        { path: '', redirectTo: 'panel-admin', pathMatch: 'full' },
        { path: 'panel-admin'   , component: PanelAdminComponent},
        { path: 'historial'   , component: HistorialAssistComponent},
    ]
  }
]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AssistanceRoutingModule { }