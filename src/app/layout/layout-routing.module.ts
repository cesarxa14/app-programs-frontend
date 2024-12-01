import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from "./layout.component";
import { ClasesComponent } from "./modules/clases/clases.component";


const routes: Routes = [
    {
      path: '',
      component: LayoutComponent,
      children: [
        { path: 'clases', loadChildren: () => import('./modules/clases/clases.module').then(m => m.ClasesModule) },
        { path: 'customers', loadChildren: () => import('./modules/customers/customers.module').then(m => m.CustomersModule) },
        { path: 'assistance', loadChildren: () => import('./modules/assistance/assistance.module').then(m => m.AssistanceModule) },
        { path: 'store', loadChildren: () => import('./modules/store/store.module').then(m => m.StoreModule) }


      ]
    }
    
]
@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
  export class LayoutRoutingModule { }