import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProgramService } from '../../../clases/services/program.service';
import { IProgramEntity } from '../../../clases/interfaces/programs/IProgramEntity';
import { SharedService } from 'src/app/shared/services/shared.service';
import { IBookEntity } from '../../interfaces/IBookEntity';
import { MyCustomerService } from '../../../customers/services/my-customer.service';
import { IUserCustomerEntity } from '../../../customers/interfaces/IUserCustomerEntity';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { SubscriptionService } from '../../../customers/services/subscription.service';
import { ModalAssistDetailComponent } from './modal.assist-detail/modal.assist-detail.component';
import { AssistService } from '../../services/assist.service';
import { ICreateAssistDto } from '../../interfaces/ICreateAssistDto';
import { Router } from '@angular/router';

export interface InfoToModalDetail {
  studentId: number;
  studentName:string;
  programName: string;
  assistDate: string;
  assistHour: string;
  additional_notes: string;
  packageId: number;
  programId: number;
  assistantId: number;
  subscriptionId: number;

}
@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.css']
})
export class PanelAdminComponent implements OnInit {

  searchForm: FormGroup;
  createAssistForm: FormGroup;
  createAssistCustomerForm: FormGroup;
  toggleButton: boolean = false;
  idUser: number;
  roleId: number;
  stringSwitchFilter: string = 'Buscar por nombre';
  labelFilterInput: string = 'Nombre';
  customersFoundList: IUserCustomerEntity[] = [];
  programList: any[] = [];
  packageId: number;
  programId: number;
  subscriptionId: number;
  programName: string;
  studentInfo: any;
  infoToModal: InfoToModalDetail;
  
  constructor(
    private _formBuilder: FormBuilder,
    private sharedService: SharedService,
    private myCustomerService: MyCustomerService,
    private programService: ProgramService,
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.idUser = this.sharedService.getUserId();
    this.roleId = this.sharedService.getRoleId();
    console.log(this.roleId)
    if(this.roleId == 1 || this.roleId == 2){
      this.searchForm = this._builderSearchForm();
      this.createAssistForm = this._builderCreateAssistForm();
      this.onCustomerChange();
      this.onProgramChange();
    }else if(this.roleId == 3){ 
      this.router.navigateByUrl('/pages/assistance/historial')
      // this.createAssistCustomerForm = this._builderCreateAssistCustomerForm();
      // this.onProgram2Change();
      // this.getProgramValidByUser(this.idUser);
    }

  }

  _builderSearchForm() {
    // const pattern = '[a-zA-Z ]{2,254}';
    const form = this._formBuilder.group({
      search: [null],
    });

    return form;
  }

  get search() {return this.searchForm.controls["search"]}

  _builderCreateAssistForm() {
    // const pattern = '[a-zA-Z ]{2,254}';
    
    const form = this._formBuilder.group({
      customer: [null, [Validators.required]],
      program: [null, [Validators.required]],
      additional_notes: [null, []],
    });

    return form;
  }

  get customer() {return this.createAssistForm.controls["customer"]}
  get program() {return this.createAssistForm.controls["program"]}
  get additional_notes() {return this.createAssistForm.controls["additional_notes"]}


  _builderCreateAssistCustomerForm() {
    // const pattern = '[a-zA-Z ]{2,254}';
    
    const form = this._formBuilder.group({
      program2: [null, [Validators.required]],
      additional_notes2: [null, []],
    });

    return form;
  }

  get program2() {return this.createAssistCustomerForm.controls["program2"]}
  get additional_notes2() {return this.createAssistCustomerForm.controls["additional_notes2"]}

  changeToggle(event: Event){
    const input = event.target as HTMLInputElement;
    const isChecked = input.checked; // Obtiene el estado del toggle (true/false)
    console.log('Estado del toggle:', isChecked);
    this.toggleButton = isChecked;
    if(this.toggleButton){
      this.stringSwitchFilter = 'Buscar por DNI'
      this.labelFilterInput = 'Numero de documento'
    }else {
      this.labelFilterInput = 'Nombre'
      this.stringSwitchFilter = 'Buscar por nombre'
    }
  }

  searchStudent() {
    Swal.showLoading();
    this.myCustomerService.getMyCustomersBySearch(this.idUser, this.labelFilterInput, this.searchForm.value.search)
      .subscribe((res: any) => {
        this.customersFoundList = [];
        this.programList = [];
        Swal.close();
  
        this.customersFoundList = res.data;
  
        // Limpia y reinicia los valores del formulario de asistencias
        this.createAssistForm.reset({
          customer: null,
          program: null,
          additional_notes: null,
        });
  
        if (this.customersFoundList.length > 0) {
          // Selecciona el primer alumno por defecto
          const defaultCustomer = this.customersFoundList[0];
          this.createAssistForm.controls['customer'].setValue(defaultCustomer);
  
          // Obtiene los programas válidos para el primer alumno
          this.getProgramValidByUser(defaultCustomer.id);
        }
      });
  }

  onCustomerChange(){
    
    this.customer?.valueChanges.subscribe(value => {
      console.log('value student: ', value)
      this.studentInfo = value;
      this.programName = value.program_name
      this.programId = value.program_id;
      this.packageId = value.package_id;
    })
  }


  onProgramChange(){
    
    this.program?.valueChanges.subscribe(value => {
      console.log('value program: ', value)
      this.programName = value.program_name
      this.programId = value.program_id;
      this.packageId = value.package_id;
    })
  }

  onProgram2Change(){
    
    this.program2?.valueChanges.subscribe(value => {
      console.log('value program: ', value)
      this.programName = value.program_name
      this.programId = value.program_id;
      this.packageId = value.package_id;
    })
  }

  onChangeSelectCustomer(event: Event) {
    const selectedCustomer = this.createAssistForm.value.customer;
    if (selectedCustomer) {
      Swal.showLoading();
      this.getProgramValidByUser(selectedCustomer.id);
    }
  }
  

  getProgramValidByUser(studentId: number) {
    this.programService.getProgramValidByUser(studentId).subscribe((res: any) => {
      Swal.close();
  
      this.programList = res.data;
  
      if (this.programList.length > 0) {
        // Selecciona el primer programa por defecto
        const defaultProgram = this.programList[0];
        console.log('defaultProgram', defaultProgram)
        this.subscriptionId = defaultProgram.id;
        this.createAssistForm.controls['program'].setValue(defaultProgram);
      } else {
        alert('El usuario no tiene subscripciones válidas');
      }
    });
  }
  

  getCurrentHour(){
    const currentDate = new Date();

    const hours = currentDate.getHours(); 
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    // Formatear la hora en formato legible
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return formattedTime;
  }

  createAssist(){

    this.infoToModal = {
      assistDate: new Date().toString(),
      assistHour: this.getCurrentHour(),
      additional_notes: this.additional_notes.value,
      studentId: this.studentInfo.id,
      programName: this.programName,
      studentName: `${this.studentInfo.name} ${this.studentInfo.lastname}`,
      packageId: this.packageId,
      programId: this.programId,
      assistantId: this.idUser,
      subscriptionId: this.subscriptionId

    }
    const dialogRef = this.dialog.open(ModalAssistDetailComponent, {
      width: '700px',
      height: 'auto',
      data: this.infoToModal,
      panelClass: 'custom-dialog',
      disableClose: true
    })

    dialogRef.componentInstance.modal_emit.subscribe((res:any) => {
      this.search.reset();
      this.createAssistForm.reset();
      this.customersFoundList = [];
      this.programList = [];
     
    })  
    
  }

  createAssistCustomer(){

    const nameCustomer = localStorage.getItem('name')
    const lastnameCustomer = localStorage.getItem('lastname')

    this.infoToModal = {
      assistDate: new Date().toString(),
      assistHour: this.getCurrentHour(),
      additional_notes: this.additional_notes2.value,
      studentId: this.idUser,
      programName: this.programName,
      studentName: `${nameCustomer} ${lastnameCustomer}`,
      packageId: this.packageId,
      programId: this.programId,
      assistantId: this.idUser,
      subscriptionId: this.subscriptionId
    }



    const dialogRef = this.dialog.open(ModalAssistDetailComponent, {
      width: '700px',
      height: 'auto',
      data: this.infoToModal,
      panelClass: 'custom-dialog',
      disableClose: true
    })

    dialogRef.componentInstance.modal_emit.subscribe((res:any) => {
      this.search.reset();
      this.createAssistForm.reset();
      this.customersFoundList = [];
      this.programList = [];
     
    })

    // this.assistService.createAssist(payloadCreateAssist).subscribe((res:any)=> {
    //   console.log('res: ', res)
 
   
      
    // }, (err) => {
    //   console.log('error: ', err)
    //   alert(err.error.message)
    // })
    
  }


}
