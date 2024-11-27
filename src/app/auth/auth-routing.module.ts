import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { VerifyEmailComponent } from "./pages/verify-email/verify-email.component";

const routes: Routes = [
    {
      path: '',
      component: AuthComponent,
      children: [
        { path: 'login'   , component: LoginComponent},
        { path: 'register', component: RegisterComponent },
        { path: 'verify-email', component: VerifyEmailComponent },
        // { path: 'register-admin', component: RegisterAdminComponent }
      ]
    },
    {
        path: '**',
        redirectTo: '/login'
    }
  ]
  
@NgModule({
imports: [
    RouterModule.forChild(routes)
],
exports: [RouterModule]
})
export class AuthRoutingModule { }