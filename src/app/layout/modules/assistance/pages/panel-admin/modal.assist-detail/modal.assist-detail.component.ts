import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AssistService } from '../../../services/assist.service';
import Swal from 'sweetalert2';
import { PackageService } from 'src/app/layout/modules/clases/services/package.service';
import { InfoToModalDetail } from '../panel-admin.component';
import { ICreateAssistDto } from '../../../interfaces/ICreateAssistDto';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-modal.assist-detail',
  templateUrl: './modal.assist-detail.component.html',
  styleUrls: ['./modal.assist-detail.component.css']
})
export class ModalAssistDetailComponent implements OnInit {

  roleId: any;
  titleModal: string = 'Información previa a registro de Asistencia';
  subtitleModal: string = 'Detalles sobre la asistencia que se va a registrar';
  countAssist: number = 0;
  totalClasses: number = 0;
  assistList: any[] = [];
  isAlreadyRegistered: boolean = false;
  messageAssistOverLimit: string;
  @Output() modal_emit:any = new EventEmitter();
  constructor(
    @Inject(MAT_DIALOG_DATA) public payload: InfoToModalDetail,
    private assistService: AssistService,
    public dialogRef: MatDialogRef<ModalAssistDetailComponent>,
    private packageService: PackageService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    console.log('payload: ', this.payload)
    this.roleId = this.sharedService.getRoleId();
    this.messageAssistOverLimit = this.roleId == 1 ? 'No tiene clases restantes, el cliente necesita comprar un nuevo paquete.': 'No tienes clases restantes, necesitas comprar un nuevo paquete.'
    this.getAssistsByUserPackages();
  }

  getAssistsByUserPackages(){
    Swal.showLoading();
    this.assistService.getAssistsByUserPackages(this.payload.studentId).subscribe((res: any) => {
      console.log('assits: ', res)
      this.assistList = res.data;
      this.countAssist = res.data.length;
      this.getNumClassesByUser();
    })
  }

  getNumClassesByUser(){
    Swal.showLoading();

    this.packageService.getNumClassesByUser(this.payload.studentId).subscribe((res: any) => {
      Swal.close();
      console.log('pack: ', res)
      this.totalClasses = res.data[0].num_clases
    })
  }

  closeModal(){
    this.dialogRef.close();
    this.modal_emit.emit();
  }

  createAssist(){
    if(this.roleId == 1){
      this.createAssistAdmin();
    } else if(this.roleId == 3){
      this.createAssistCustomer();
    }
  }

  sendReminder(){
    const payload = {
      studentId: this.payload.studentId
    }
    Swal.showLoading()
    this.assistService.sendReminder(payload).subscribe((res => {
      console.log('res:', res)
      Swal.close();
      Swal.fire({
        title: 'Se envió el recordatorio!',
        // text: 'Se inició sesión',
        icon: 'success',
        confirmButtonText: 'Ir',
        allowOutsideClick: false
      })

    }))
  }
  createAssistAdmin(){

    Swal.showLoading();
    const payloadCreateAssist: ICreateAssistDto = {
      additional_notes: this.payload.additional_notes,
      assistant: this.payload.assistantId,
      classHour: this.getCurrentHour(),
      pack: this.payload.packageId,
      program: this.payload.programId,
      student: this.payload.studentId

    }

    this.assistService.createAssist(payloadCreateAssist).subscribe((res:any)=> {
      console.log('res: ', res)
      Swal.close();
      Swal.fire({
        title: 'Se registró la asistencia!',
        // text: 'Se inició sesión',
        icon: 'success',
        confirmButtonText: 'Ir',
        allowOutsideClick: false
      }).then((result) => {
        console.log('result: ', result)
        if(result.isConfirmed){
          this.isAlreadyRegistered = true;
          this.titleModal = 'Información de Asistencia Registrada';
          this.subtitleModal = 'Las asistencia ha sido registrada exitosamente. Aquí están los detalles';
          this.getAssistsByUserPackages();
          this.getNumClassesByUser();

          
        }
      })
   
      
    }, (err) => {
      console.log('error: ', err)
      Swal.close();
      alert(err.error.message)
    })

    
  }

  createAssistCustomer(){

    Swal.showLoading();
    const payloadCreateAssist: ICreateAssistDto = {
      additional_notes: this.payload.additional_notes,
      assistant: this.payload.assistantId,
      classHour: this.getCurrentHour(),
      pack: this.payload.packageId,
      program: this.payload.programId,
      student: this.payload.studentId

    }

    this.assistService.createAssist(payloadCreateAssist).subscribe((res:any)=> {
      console.log('res: ', res)
      Swal.close();
      Swal.fire({
        title: 'Se registró la asistencia!',
        // text: 'Se inició sesión',
        icon: 'success',
        confirmButtonText: 'Ir',
        allowOutsideClick: false
      }).then((result) => {
        console.log('result: ', result)
        if(result.isConfirmed){
          this.isAlreadyRegistered = true;
          this.titleModal = 'Información de Asistencia Registrada';
          this.subtitleModal = 'Las asistencia ha sido registrada exitosamente. Aquí están los detalles';
          this.getAssistsByUserPackages();
          this.getNumClassesByUser();

          
        }
      })
   
      
    }, (err) => {
      console.log('error: ', err)
      Swal.close();
      alert(err.error.message)
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

}
