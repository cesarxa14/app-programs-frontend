import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateProgramDto } from 'src/app/clases/interfaces/programs/ICreateProgramDto';
import { ProgramService } from 'src/app/clases/services/program.service';


@Component({
  selector: 'app-add-program-modal',
  templateUrl: './add-program-modal.component.html',
  styleUrls: ['./add-program-modal.component.css']
})
export class AddProgramModalComponent implements OnInit {

  addProgramForm: FormGroup;
  constructor(
    private programService: ProgramService,
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.addProgramForm = this._builderForm();
  }

  _builderForm() {
    // const pattern = '[a-zA-Z ]{2,254}';
    const form = this._formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]]     
    });

    return form;
  }

  get name() {return this.addProgramForm.controls["name"]}
  get description() {return this.addProgramForm.controls["description"]}
  get startDate() {return this.addProgramForm.controls["startDate"]}
  get endDate() {return this.addProgramForm.controls["endDate"]}

  createProgram(){

    let payloadCreate: CreateProgramDto = {
      name: this.name.value,
      description: this.description.value,
      startDate: this.startDate.value,
      endDate: this.endDate.value
    }

    this.programService.createProgram(payloadCreate).subscribe((res: any) => {
      console.log('res')
    })


  }

}
