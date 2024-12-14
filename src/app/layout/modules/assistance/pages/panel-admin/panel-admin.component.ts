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

export interface InfoToModalDetail {
  studentId: number;
  studentName:string;
  programName: string;
  assistDate: string;
  assistHour: string;
  additional_notes: string;
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
  programName: string;
  studentInfo: any;
  infoToModal: InfoToModalDetail;
  
  constructor(
    private _formBuilder: FormBuilder,
    private sharedService: SharedService,
    private myCustomerService: MyCustomerService,
    private programService: ProgramService,
    public dialog: MatDialog,
    private assistService: AssistService
  ) { }

  ngOnInit(): void {
    this.idUser = this.sharedService.getUserId();
    this.roleId = this.sharedService.getRoleId();
    console.log(this.roleId)
    if(this.roleId == 1){
      this.searchForm = this._builderSearchForm();
      this.createAssistForm = this._builderCreateAssistForm();
      this.onCustomerChange();
      this.onProgramChange();
    }else if(this.roleId == 3){
      this.createAssistCustomerForm = this._builderCreateAssistCustomerForm();
      this.onProgram2Change();
      this.getProgramValidByUser(this.idUser);
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

  searchStudent(){
    Swal.showLoading();
    this.myCustomerService.getMyCustomersBySearch(this.idUser, this.labelFilterInput, this.search.value).subscribe((res: any) => {
      console.log('res: ', res)
      Swal.close();
      this.customersFoundList =res.data;
    })
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

  onChangeSelectCustomer(event: Event){
    // console.log(this.customer.value)
    Swal.showLoading();
    this.getProgramValidByUser(this.studentInfo.id);
    
  }

  getProgramValidByUser(studentId: number){
    this.programService.getProgramValidByUser(studentId).subscribe((res:any)=> {
      console.log('res valid: ', res);
      Swal.close();
      if(res.data.length < 1){
        alert('El usuario no tiene subscripciones validas')
      }else {
        this.programList = res.data
        // console.log('activeHours', this.activeHours)
      }
    })
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

    const payloadCreateAssist: ICreateAssistDto = {
      additional_notes: this.additional_notes.value,
      assistant: this.idUser,
      classHour: this.getCurrentHour(),
      pack: this.packageId,
      program: this.programId,
      student: Number(this.studentInfo.id)

    }

    this.assistService.createAssist(payloadCreateAssist).subscribe((res:any)=> {
      console.log('res: ', res)
      this.infoToModal = {
        assistDate: res.createdAt,
        assistHour: res.classHour,
        additional_notes: this.additional_notes.value,
        studentId: this.studentInfo.id,
        programName: this.programName,
        studentName: `${this.studentInfo.name} ${this.studentInfo.lastname}`
  
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
    }, (err) => {
      console.log('error: ', err)
      alert(err.error.message)
    })
    
  }

  createAssistCustomer(){

    const payloadCreateAssist: ICreateAssistDto = {
      additional_notes: this.additional_notes2.value,
      assistant: this.idUser,
      classHour: this.getCurrentHour(),
      pack: this.packageId,
      program: this.programId,
      student: this.idUser

    }

    this.assistService.createAssist(payloadCreateAssist).subscribe((res:any)=> {
      console.log('res: ', res)
      const nameCustomer = localStorage.getItem('name')
      const lastnameCustomer = localStorage.getItem('lastname')
      this.infoToModal = {
        assistDate: res.createdAt,
        assistHour: res.classHour,
        additional_notes: this.additional_notes2.value,
        studentId: this.idUser,
        programName: this.programName,
        studentName: `${nameCustomer} ${lastnameCustomer}`
  
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
    }, (err) => {
      console.log('error: ', err)
      alert(err.error.message)
    })
    
  }


}
