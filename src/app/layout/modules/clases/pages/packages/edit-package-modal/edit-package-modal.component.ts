import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IPackageEntity } from '../../../interfaces/packages/IPackageEntity';
import { PackageService } from '../../../services/package.service';
import { IEditPackageDto } from '../../../interfaces/packages/IEditPackageDto';
import { ProgramService } from '../../../services/program.service';
import { IProgramEntity } from '../../../interfaces/programs/IProgramEntity';
import Swal from 'sweetalert2';
import { SharedService } from 'src/app/shared/services/shared.service';
import { SettingsService } from 'src/app/layout/modules/settings/services/settings.service';


@Component({
  selector: 'app-edit-package-modal',
  templateUrl: './edit-package-modal.component.html',
  styleUrls: ['./edit-package-modal.component.css']
})
export class EditPackageModalComponent implements OnInit {

  idUser: number;
  editPackageForm: FormGroup;
  programsList: IProgramEntity[] = [];
  isStatusChecked: boolean = true;
  booleanStatus: boolean;
  @Output() package_edit_emit:any = new EventEmitter();

  listDays= ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"]
  listHours: any[] = []
  constructor(
    @Inject(MAT_DIALOG_DATA) public packag: any,
    private _formBuilder: FormBuilder,
    private packageService: PackageService,
    private sharedService: SharedService,
    private programService: ProgramService,
    public dialogRef: MatDialogRef<EditPackageModalComponent>,
    private settingService: SettingsService
  ) { 
    this.booleanStatus = this.packag.status == 'HABILITADO' ? true : false

    this.isStatusChecked = this.booleanStatus;
  }

  ngOnInit(): void {
    this.idUser = this.sharedService.getUserId();
    this.editPackageForm = this._builderForm();
    this.getPrograms();
    this.getValueChangesStatus();
    this.getHours();
    console.log('packag: ', this.packag)
  }

  _builderForm() {
    // const pattern = '[a-zA-Z ]{2,254}';
    const numberPattern = '^[0-9]*$'
    const decimalPattern = '^[0-9]+(\.[0-9]{1,2})?$'
    console.log(JSON.parse(this.packag.activeHours))
    // this.listDays = JSON.parse(this.packag.activeDays)
    // this.listHours = JSON.parse(this.packag.activeHours)
    const form = this._formBuilder.group({
      program: [this.packag.program_id, [Validators.required]],
      name: [this.packag.name, [Validators.required]],
      num_clases: [this.packag.num_clases, [Validators.required, Validators.pattern(numberPattern)]],
      expiration: [this.packag.expiration, [Validators.required, Validators.pattern(numberPattern)]],
      cost: [this.packag.cost, [Validators.required, Validators.pattern(decimalPattern)]],
      status: [this.booleanStatus, [Validators.required]]   ,
      activeDays: [JSON.parse(this.packag.activeDays) || [], [Validators.required]],
      activeHours: [JSON.parse(this.packag.activeHours) || [], []],

    });

    

    return form;
  }

  get program() {return this.editPackageForm.controls["program"]}
  get num_clases() {return this.editPackageForm.controls["num_clases"]}
  get name() {return this.editPackageForm.controls["name"]}
  get expiration() {return this.editPackageForm.controls["expiration"]}
  get cost() {return this.editPackageForm.controls["cost"]}
  get status() {return this.editPackageForm.controls["status"]}
  get activeDays() {return this.editPackageForm.controls["activeDays"]}
  get activeHours() {return this.editPackageForm.controls["activeHours"]}

  getHours(){
    this.settingService.getHours().subscribe((res:any) => {
      console.log('get hours: ', res)
      this.listHours = res.data;

      this.editPackageForm.patchValue({
        activeHours: this.listHours.filter(hour =>
          JSON.parse(this.packag.activeHours).some((active:any) => active.id === hour.id)
        ),
      });
      console.log('activeHours: ', this.activeHours.value)
      console.log('listHours: ', this.listHours)
    })
  }

  getValueChangesStatus() {
    this.editPackageForm.get('status')?.valueChanges.subscribe((newValue) => {
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

  editPackage(){

    let setStatus = this.status.value ? 'HABILITADO' : 'DESHABILITADO'
    let payloadEdit: IEditPackageDto = {
      program: this.program.value,
      name: this.name.value,
      cost: this.cost.value,
      expiration: this.expiration.value,
      num_clases: this.num_clases.value,
      status: setStatus,
      activeDays: this.activeDays.value,
      activeHours: this.activeHours.value
    }

    console.log('payloadEdit', payloadEdit)
    
    this.packageService.editPackage(payloadEdit, this.packag.id).subscribe((res: any) => {
      console.log('res', res)
      Swal.fire({
        title: 'Se editó el paquete!',
        // text: 'Se inició sesión',
        icon: 'success',
        confirmButtonText: 'Ir',
        allowOutsideClick: false
      }).then((result) => {
        console.log('result: ', result)
        if(result.isConfirmed){
          this.package_edit_emit.emit(res);
          this.dialogRef.close()
          
        }
      })
    })
  }

}
