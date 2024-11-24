import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IProgramEntity } from '../../../interfaces/programs/IProgramEntity';
import { ProgramService } from '../../../services/program.service';
import { IEditProgramDto } from '../../../interfaces/programs/IEditProgramDto';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-edit-program-modal',
  templateUrl: './edit-program-modal.component.html',
  styleUrls: ['./edit-program-modal.component.css']
})
export class EditProgramModalComponent implements OnInit {

  editProgramForm: FormGroup;
  @Output() program_edit_emit:any = new EventEmitter();
  constructor(
    @Inject(MAT_DIALOG_DATA) public program: IProgramEntity,
    private programService: ProgramService,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditProgramModalComponent>,
  ) { }

  ngOnInit(): void {
    console.log('program: ', this.program)
    this.editProgramForm = this._builderForm();
  }

  _builderForm() {
    // const pattern = '[a-zA-Z ]{2,254}';
    const form = this._formBuilder.group({
      name: [this.program.name, [Validators.required]],
      description: [this.program.description, [Validators.required]],
      startDate: [ '', [Validators.required]],
      endDate: ['', [Validators.required]]     
    });

    form.get('startDate')!.patchValue(this.formatDate(this.program.startDate));
    form.get('endDate')!.patchValue(this.formatDate(this.program.endDate));

    return form;
  }

  private formatDate(date:any ) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  get name() {return this.editProgramForm.controls["name"]}
  get description() {return this.editProgramForm.controls["description"]}
  get startDate() {return this.editProgramForm.controls["startDate"]}
  get endDate() {return this.editProgramForm.controls["endDate"]}

  editProgram(){
    let payloadEdit: IEditProgramDto = {
      name: this.name.value,
      description: this.description.value,
      startDate: this.startDate.value,
      endDate: this.endDate.value
    }

    this.programService.editProgram(payloadEdit, this.program.id).subscribe((res: any) => {
      console.log('res', res)
      Swal.fire({
        title: 'Se editó el programa!',
        // text: 'Se inició sesión',
        icon: 'success',
        confirmButtonText: 'Ir',
        allowOutsideClick: false
      }).then((result) => {
        console.log('result: ', result)
        if(result.isConfirmed){
          this.program_edit_emit.emit(res);
          this.dialogRef.close()
          
        }
      })
    })
  }

}
