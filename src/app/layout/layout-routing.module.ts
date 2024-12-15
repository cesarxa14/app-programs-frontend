import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from "./layout.component";
import { ClasesComponent } from "./modules/clases/clases.component";
import { RoleGuardGuard } from "../shared/guards/role-guard.guard";


const routes: Routes = [
    {
      path: '',
      component: LayoutComponent,
      children: [
        { path: 'clases', loadChildren: () => import('./modules/clases/clases.module').then(m => m.ClasesModule), canActivate: [RoleGuardGuard] },
        { path: 'customers', loadChildren: () => import('./modules/customers/customers.module').then(m => m.CustomersModule), canActivate: [RoleGuardGuard] },
        { path: 'assistance', loadChildren: () => import('./modules/assistance/assistance.module').then(m => m.AssistanceModule), canActivate: [RoleGuardGuard] },
        { path: 'books', loadChildren: () => import('./modules/book/book.module').then(m => m.BookModule), canActivate: [RoleGuardGuard] },
        { path: 'store', loadChildren: () => import('./modules/store/store.module').then(m => m.StoreModule), canActivate: [RoleGuardGuard] },
        { path: 'sales', loadChildren: () => import('./modules/sales/sales.module').then(m => m.SalesModule), canActivate: [RoleGuardGuard] },
        { path: 'products', loadChildren: () => import('./modules/products/products.module').then(m => m.ProductsModule), canActivate: [RoleGuardGuard] }


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