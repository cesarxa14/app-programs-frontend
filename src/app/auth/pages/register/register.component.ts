import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ICreateUserFirstStep } from '../../interfaces/ICreateUserFirstStepDto';
import { IRolEntity } from '../../interfaces/IRolEntity';
import { RolesService } from '../../services/roles.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  roles: IRolEntity[] = [];
  showPassword = false; 
  constructor(
    private authService: AuthService,
    private rolesService: RolesService,
    private _formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.registerForm = this._builderForm();
    this.onChangePassword();
  }



  _builderForm() {
    // const pattern = '[a-zA-Z ]{2,254}';
    const form = this._formBuilder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, this.confirmPasswordValidator('password')]],
    });

    return form;
  }

  get name() {return this.registerForm.controls["name"]}
  get lastname() {return this.registerForm.controls["lastname"]}
  get email() {return this.registerForm.controls["email"]}
  get password() {return this.registerForm.controls["password"]}
  get confirmPassword() {return this.registerForm.controls["confirmPassword"]}

  onChangePassword(){
    this.password?.valueChanges.subscribe(() => {
      this.confirmPassword?.updateValueAndValidity();
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

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

  register() {
    const newUser: ICreateUserFirstStep = {
      name: this.name.value,
      lastname: this.lastname.value,
      email: this.email.value,
      password: this.password.value,
      role: 3
    }

    console.log('newUser:', newUser)

    this.authService.register(newUser).subscribe(res => {
      console.log('res: ', res);
      Swal.fire({
        title: 'Se registro al usuario!',
        text: 'Revisa tu bandeja de correo para verificar la cuenta',
        icon: 'success',
        confirmButtonText: 'Ir',
        allowOutsideClick: false
      }).then((result) => {
        console.log('result: ', result)
        if(result.isConfirmed){
          this.router.navigateByUrl('/auth/login')
        }
      })
    }, (err) => {
      Swal.fire({
        title: err.error.message,
        icon: 'error',
        allowOutsideClick: true
      })
    })


  }

}
