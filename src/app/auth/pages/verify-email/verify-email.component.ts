import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ICompleteRegisterDto } from '../../interfaces/ICompleteRegisterDto';
import Swal from 'sweetalert2';
import { SharedService } from 'src/app/shared/services/shared.service';
import {provinceData} from 'src/assets/ubigeos/provinciasData';
import {departamentosData} from 'src/assets/ubigeos/departamentosData';
import {districtData} from 'src/assets/ubigeos/distritosData';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  userId: any;
  completeRegisterForm: FormGroup;
  token: string;
  provinceSelected: any[] = [];
  districtSelected: any[] = [];
  provinceList: any = null;
  departmentList: any[] = [];
  districtList: any = null;
  countryIsPeru: boolean = true;

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
    this.onSelectCountry();
    this.onSelectDepartment();
    this.onSelectProvince();
    this.onSelectDistrict();
    this.departmentList = departamentosData;
    this.provinceList = provinceData;
    this.districtList = districtData;
    
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
      country: ['Peru', [Validators.required]],
      department: ['', []],
      province: ['', []],
      district: ['', []],
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
  get department() {return this.completeRegisterForm.controls["department"]}
  get province() {return this.completeRegisterForm.controls["province"]}
  get district() {return this.completeRegisterForm.controls["district"]}
  get type_document() {return this.completeRegisterForm.controls["type_document"]}
  get document() {return this.completeRegisterForm.controls["document"]}
  get gender() {return this.completeRegisterForm.controls["gender"]}
  get birthdate() {return this.completeRegisterForm.controls["birthdate"]}
  get medical_history() {return this.completeRegisterForm.controls["medical_history"]}

  

  onSelectCountry(){
    this.country.valueChanges.subscribe(selected=> {
      console.log('res country: ', selected)
      this.department.setValue('')
      if(selected == 'Peru'){
        this.countryIsPeru = true;
        this.provinceList = provinceData
      }else {
        this.countryIsPeru = false;
      }
    })

  }

  onSelectDepartment(){
    this.department.valueChanges.subscribe(selected => {
      console.log('selected', selected)
      const ubigeo = selected.id_ubigeo
      const valueDepartment = selected.nombre_ubigeo;
      console.log('ubigeo', ubigeo)
      this.provinceSelected = this.provinceList[ubigeo];
      console.log(this.provinceSelected);
      this.province.setValue('');
      this.district.setValue('');
     
    })
  }


  onSelectProvince(){
    this.province.valueChanges.subscribe(selected => {
      console.log('selected', selected)
      const ubigeo = selected.id_ubigeo
      console.log('ubigeo', ubigeo)
      this.districtList = districtData
      this.districtSelected = this.districtList[ubigeo];
      console.log(this.districtSelected);
      this.district.setValue('');

    })
  }

  onSelectDistrict(){
    this.district.valueChanges.subscribe(selected => {
      console.log('selected', selected)
      
    })
  }

  completeRegister(){

    const payloadCompleteRegister: ICompleteRegisterDto = {
      userId: this.userId,
      phone: this.phone.value,
      country: this.country.value,
      department: this.department.value["nombre_ubigeo"] || '',
      province: this.province.value["nombre_ubigeo"] || '',
      district: this.district.value["nombre_ubigeo"] || '',
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
