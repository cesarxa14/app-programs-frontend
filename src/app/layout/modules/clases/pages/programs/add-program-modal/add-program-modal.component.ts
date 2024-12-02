import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProgramService } from '../../../services/program.service';
import { CreateProgramDto } from '../../../interfaces/programs/ICreateProgramDto';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';
import {jwtDecode} from 'jwt-decode';
import { IJwtPayload } from 'src/app/shared/interfaces/IJWTDecode';



@Component({
  selector: 'app-add-program-modal',
  templateUrl: './add-program-modal.component.html',
  styleUrls: ['./add-program-modal.component.css']
})
export class AddProgramModalComponent implements OnInit {

  today: string = new Date().toISOString().split('T')[0];
  minEndDate: string;
  idUser: number;
  addProgramForm: FormGroup;
  @Output() program_emit:any = new EventEmitter();
  constructor(
    private programService: ProgramService,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddProgramModalComponent>,
  ) { }

  ngOnInit(): void {
    this.addProgramForm = this._builderForm();
    this.getToken()
  }

  getToken(){
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode<IJwtPayload>(token!)
    console.log('decodedToken', decodedToken)
    this.idUser = Number(decodedToken.id);
  }

  _builderForm() {
    // const pattern = '[a-zA-Z ]{2,254}';
    
    const form = this._formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [{ value: null, disabled: true }, [Validators.required]]     
    });

    return form;
  }

  get name() {return this.addProgramForm.controls["name"]}
  get description() {return this.addProgramForm.controls["description"]}
  get startDate() {return this.addProgramForm.controls["startDate"]}
  get endDate() {return this.addProgramForm.controls["endDate"]}

  onStartDateChange(event: Event){
    const input = event.target as HTMLInputElement;
    console.log('input: ', input.value)
    
    this.endDate.enable();
    this.endDate.reset();
    this.minEndDate = input.value;
  }

  createProgram(){

    let payloadCreate: CreateProgramDto = {
      name: this.name.value,
      description: this.description.value,
      user_id: this.idUser,
      startDate: this.startDate.value,
      endDate: this.endDate.value
    }

   

    this.programService.createProgram(payloadCreate).subscribe((res: any) => {
      console.log('res')
      Swal.fire({
        title: 'Se creó el programa!',
        // text: 'Se inició sesión',
        icon: 'success',
        confirmButtonText: 'Ir',
        allowOutsideClick: false
      }).then((result) => {
        console.log('result: ', result)
        if(result.isConfirmed){
          this.program_emit.emit(payloadCreate);
          this.dialogRef.close()
          
        }
      })
    })


  }

}
