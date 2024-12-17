import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ICompleteRegisterDto } from '../../interfaces/ICompleteRegisterDto';
import Swal from 'sweetalert2';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  userId: any;
  completeRegisterForm: FormGroup;
  token: string;

  constructor(
    private route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.getQueryParams();
    this.userId = this.sharedService.getUserIdTokenParam(this.token);
    console.log(this.userId)
    this.completeRegisterForm = this._builderForm();
  }

  getQueryParams() {
    const token = this.route.snapshot.queryParamMap.get('token');
    const byAssistant = this.route.snapshot.queryParamMap.get('byAssistant'); 
    console.log('tokennnn: ', token)
    console.log('byAssistant: ', byAssistant)

    if(byAssistant){
      const payloadVerify = {
        token,
        byAssistant
      }
      this.authService.verifyUser(payloadVerify).subscribe((res:any) => {
        console.log('res: ', res)
        Swal.fire({
          title: 'Se verificó el usuario!',
          // text: 'Se inició sesión',
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
      
      return;
    } 
    if(token){
      this.token = token;
    }
  }

  _builderForm() {
    // const pattern = '[a-zA-Z ]{2,254}';
    const form = this._formBuilder.group({
      phone: ['', [Validators.required]],
      country: ['', [Validators.required]],
      province: ['', [Validators.required]],
      district: ['', [Validators.required]],
      type_document: [null, [Validators.required]],
      document: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      birthdate: [null, [Validators.required]],
      medical_history: ['', [Validators.required]],
    });

    return form;
  }

  get phone() {return this.completeRegisterForm.controls["phone"]}
  get country() {return this.completeRegisterForm.controls["country"]}
  get province() {return this.completeRegisterForm.controls["province"]}
  get district() {return this.completeRegisterForm.controls["district"]}
  get type_document() {return this.completeRegisterForm.controls["type_document"]}
  get document() {return this.completeRegisterForm.controls["document"]}
  get gender() {return this.completeRegisterForm.controls["gender"]}
  get birthdate() {return this.completeRegisterForm.controls["birthdate"]}
  get medical_history() {return this.completeRegisterForm.controls["medical_history"]}

  completeRegister(){

    const payloadCompleteRegister: ICompleteRegisterDto = {
      userId: this.userId,
      phone: this.phone.value,
      country: this.country.value,
      province: this.province.value,
      district: this.district.value,
      type_document: this.type_document.value,
      document: this.document.value,
      gender: this.gender.value,
      birthdate: this.birthdate.value,
      medical_history: this.medical_history.value,
    }

    console.log('payloadCompleteRegister: ', payloadCompleteRegister)
    this.authService.completeRegister(payloadCompleteRegister).subscribe(res => {
      console.log('res: ', res)
      Swal.fire({
        title: 'Se verificó el usuario!',
        // text: 'Se inició sesión',
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
