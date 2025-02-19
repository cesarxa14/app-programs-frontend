import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ILoginDto } from '../../interfaces/ILoginDto';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loginForm = this._builderForm();
  }

  _builderForm() {
    // const pattern = '[a-zA-Z ]{2,254}';
    const form = this._formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],     
    });

    return form;
  }

  get email() {return this.loginForm.controls["email"]}
  get password() {return this.loginForm.controls["password"]}

  login() {

    Swal.showLoading();
    const payloadLogin: ILoginDto = {
      email: this.email.value,
      password: this.password.value
    }
    this.authService.signIn(payloadLogin).subscribe((res:any) => {
      Swal.close();
      console.log('res: ', res)

      localStorage.setItem('token', res.token)
      localStorage.setItem('role', res.data.role)
      localStorage.setItem('name', res.data.name)
      localStorage.setItem('lastname', res.data.lastname)
      if(res.data.role === 3) localStorage.setItem('car', JSON.stringify([]))

      if(res.data.role == '1' || res.data.role == '2'){
        this.router.navigateByUrl('/pages/home')
      }else if(res.data.role == '3'){
        this.router.navigateByUrl('/pages/books')
      }
      
    }, (err) =>{
      console.log('err: ', err)
      Swal.fire({
        title: 'No se puedo iniciar sesión',
        text: err.error.message,
        icon: 'error',
        confirmButtonText: 'Volver',
        allowOutsideClick: false
      }).then((result) => {
        console.log('result: ', result)
        if(result.isConfirmed){
          this.router.navigateByUrl('/auth/login')
        }
      })
      // alert(err.error.message)
      this.toastr.error(err.error.message);
    })
  }

}
