import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PackageService } from '../../../services/package.service';
import { ICreatePackageDto } from '../../../interfaces/packages/ICreatePackageDto';
import { ProgramService } from '../../../services/program.service';
import { IProgramEntity } from '../../../interfaces/programs/IProgramEntity';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';
import { SharedService } from 'src/app/shared/services/shared.service';


@Component({
  selector: 'app-add-package-modal',
  templateUrl: './add-package-modal.component.html',
  styleUrls: ['./add-package-modal.component.css']
})
export class AddPackageModalComponent implements OnInit {


  listDays= ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"]

  listHours = [
    {
      start: "05:00",
      end: "06:00"
    },
    {
      start: "06:00",
      end: "07:00"
    },
    {
      start: "07:00",
      end: "08:00"
    },
    {
      start: "08:00",
      end: "09:00"
    },
    {
      start: "09:00",
      end: "10:00"
    },
    {
      start: "10:00",
      end: "11:00"
    },
    {
      start: "11:00",
      end: "12:00"
    },
    {
      start: "12:00",
      end: "13:00"
    },
    {
      start: "13:00",
      end: "14:00"
    },
    {
      start: "14:00",
      end: "15:00"
    },
    {
      start: "15:00",
      end: "16:00"
    },
    {
      start: "16:00",
      end: "17:00"
    },
    {
      start: "17:00",
      end: "18:00"
    },
    {
      start: "19:00",
      end: "20:00"
    },
    {
      start: "20:00",
      end: "21:00"
    },
  ]
  idUser: number;
  programsList: IProgramEntity[] = [];
  addPackageForm: FormGroup;
  isStatusChecked: boolean = true;
  @Output() package_emit:any = new EventEmitter();
  constructor(
    private packageService: PackageService,
    private programService: ProgramService,
    private sharedService: SharedService,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddPackageModalComponent>,
  ) { }



  ngOnInit(): void {
    this.idUser = this.sharedService.getUserId();
    this.addPackageForm = this._builderForm();
    this.getPrograms();
    this.getValueChangesStatus();

    
  }

  _builderForm() {
    // const pattern = '[a-zA-Z ]{2,254}';
    const numberPattern = '^[0-9]*$'
    const decimalPattern = '^[0-9]+(\.[0-9]{1,2})?$'
    const form = this._formBuilder.group({
      program: [null, [Validators.required]],
      name: ['', [Validators.required]],
      num_clases: [null, [Validators.required]],
      expiration: [null, [Validators.required]],
      cost: [null, [Validators.required]],
      status: [true, [Validators.required]],
      activeDays: [null, [Validators.required]],
      activeHours: [null, []],
    });

    return form;
  }


  get program() {return this.addPackageForm.controls["program"]}
  get num_clases() {return this.addPackageForm.controls["num_clases"]}
  get name() {return this.addPackageForm.controls["name"]}
  get expiration() {return this.addPackageForm.controls["expiration"]}
  get cost() {return this.addPackageForm.controls["cost"]}
  get status() {return this.addPackageForm.controls["status"]}
  get activeDays() {return this.addPackageForm.controls["activeDays"]}
  get activeHours() {return this.addPackageForm.controls["activeHours"]}
  

  getValueChangesStatus() {
    this.addPackageForm.get('status')?.valueChanges.subscribe((newValue) => {
      console.log('El valor cambió:', newValue);
      this.isStatusChecked = newValue
      // Aquí puedes ejecutar tu lógica
    });

  }

  getPrograms() {
    this.programService.getPrograms(this.idUser).subscribe((res: any) =>{
      console.log('programs: ', res)
      this.programsList = res.data;
    })
  }


  createPackage(){

    Swal.showLoading();
    let setStatus = this.status.value ? 'HABILITADO' : 'DESHABILITADO'

    let payloadCreate: ICreatePackageDto = {
      program: this.program.value,
      name: this.name.value,
      num_clases: this.num_clases.value,
      cost: this.cost.value,
      expiration: this.expiration.value,
      status: setStatus,
      activeDays: JSON.stringify(this.activeDays.value) ,
      activeHours:JSON.stringify(this.activeHours.value)
    }
    console.log('payloadCreate', payloadCreate)

    this.packageService.createPackage(payloadCreate).subscribe((res: any) => {
      console.log('res', res)
      Swal.close();
      Swal.fire({
        title: 'Se creó el paquete!',
        // text: 'Se inició sesión',
        icon: 'success',
        confirmButtonText: 'Ir',
        allowOutsideClick: false
      }).then((result) => {
        console.log('result: ', result)
        if(result.isConfirmed){
          this.package_emit.emit(res);
          this.dialogRef.close()
          
        }
      })
    })


  }

}
