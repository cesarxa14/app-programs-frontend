import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IEditProgramDto } from 'src/app/clases/interfaces/programs/IEditProgramDto';
import { IProgramEntity } from 'src/app/clases/interfaces/programs/IProgramEntity';
import { ProgramService } from 'src/app/clases/services/program.service';

@Component({
  selector: 'app-edit-program-modal',
  templateUrl: './edit-program-modal.component.html',
  styleUrls: ['./edit-program-modal.component.css']
})
export class EditProgramModalComponent implements OnInit {

  editProgramForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public program: IProgramEntity,
    private programService: ProgramService,
    private _formBuilder: FormBuilder,
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

    this.programService.editProgram(payloadEdit).subscribe((res: any) => {
      console.log('res')
    })
  }

}
