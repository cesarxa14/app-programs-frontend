import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { UserService } from 'src/app/shared/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  showPassword = false; 
  userData: any;
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private sharedService: SharedService,
    private _formBuilder: FormBuilder,
    private userService: UserService

  ) { }

  ngOnInit(): void {
    this.resetPasswordForm = this._builderForm();
    this.getQueryParams()
  }

  getQueryParams() {
    const token = this.route.snapshot.queryParamMap.get('token');
    console.log('tokennnn: ', token)

    let idUser = this.sharedService.getUserIdTokenParam(token);
    console.log('idUser: ', idUser)
    //this.userService.getUserById(idUser).subscribe((res:any) => {
      this.userService.getUserByEmail(idUser).subscribe((res:any) => {
      console.log('userData: ', res)
      this.userData = res.data;
      this.email.setValue(this.userData.email)
      this.email.disable();
    })
  
  }

   _builderForm() {
    // const pattern = '[a-zA-Z ]{2,254}';
    const form = this._formBuilder.group({
      email: ['', [Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, this.confirmPasswordValidator('password')]],
    });

    return form;
  }
  
  get email() {return this.resetPasswordForm.controls["email"]}
  get password() {return this.resetPasswordForm.controls["password"]}
  get confirmPassword() {return this.resetPasswordForm.controls["confirmPassword"]}

  confirmPasswordValidator(passwordControlName: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.parent) {
        return null; // Si no hay un padre (FormGroup), salimos.
      }
  
      const passwordControl = control.parent.get(passwordControlName);
      if (!passwordControl) {
        return null;
      }
  
      const passwordValue = passwordControl.value;
      const confirmPasswordValue = control.value;
  
      return passwordValue === confirmPasswordValue ? null : { passwordMismatch: true };
    };
  }
  

  resetPassword(){
    let payload = {
      idUser: this.userData.id,
      password: this.password.value
    }
    this.authService.resetPassword(payload).subscribe((res: any) => {
      console.log('se reestableció la contraseña')
      Swal.fire({
        title: 'Se reestableció la contraseña!',
        icon: 'success',
        confirmButtonText: 'Ir',
        allowOutsideClick: false
      }).then((result) => {
        console.log('result: ', result)
        if(result.isConfirmed){
          this.router.navigateByUrl('/auth/login')
        }
      })
    })
  }

}
