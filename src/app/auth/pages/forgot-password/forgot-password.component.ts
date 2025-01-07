import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {


  resetPasswordForm: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
      this.resetPasswordForm = this._builderForm();
    }
  
    _builderForm() {
      // const pattern = '[a-zA-Z ]{2,254}';
      const form = this._formBuilder.group({
        email: ['', [Validators.required]],
      });
  
      return form;
    }
  
    get email() {return this.resetPasswordForm.controls["email"]}

  resetPassword(){

    let payload = {
      email: this.email.value
    }

    console.log('email: ', payload)

    this.authService.sendEmailResetPassword(payload).subscribe((res:any) => {
      console.log('res: ', res)
       Swal.fire({
        title: 'Se envió el correo!',
        text: 'Revisa tu bandeja de correo para reestablecer la contraseña',
        icon: 'success',
        confirmButtonText: 'Ir',
        allowOutsideClick: false
      }).then((result) => {
        console.log('result: ', result)
      })
    })

  }

}
