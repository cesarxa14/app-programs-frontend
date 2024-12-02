import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      num_clases: [null, [Validators.required, Validators.pattern(numberPattern)]],
      expiration: [null, [Validators.required, Validators.pattern(numberPattern)]],
      cost: [null, [Validators.required, Validators.pattern(decimalPattern)]],
      status: [true, [Validators.required]]   

    });

    return form;
  }

  get program() {return this.addPackageForm.controls["program"]}
  get num_clases() {return this.addPackageForm.controls["num_clases"]}
  get name() {return this.addPackageForm.controls["name"]}
  get expiration() {return this.addPackageForm.controls["expiration"]}
  get cost() {return this.addPackageForm.controls["cost"]}
  get status() {return this.addPackageForm.controls["status"]}

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

    let setStatus = this.status.value ? 'HABILITADO' : 'DESHABILITADO'

    let payloadCreate: ICreatePackageDto = {
      program: this.program.value,
      name: this.name.value,
      num_clases: this.num_clases.value,
      cost: this.cost.value,
      expiration: this.expiration.value,
      status: setStatus
    }
    console.log('payloadCreate', payloadCreate)

    this.packageService.createPackage(payloadCreate).subscribe((res: any) => {
      console.log('res', res)
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
