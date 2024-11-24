import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) 
  },
  {
    path: 'pages',
    loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule) 
  },
  // {
  //   path: 'clases',
  //   loadChildren: () => import('./clases/clases.module').then(m => m.ClasesModule) 
  // },
  {
    path: '**',
    redirectTo: '/auth/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
