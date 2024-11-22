import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICreatePackageDto } from 'src/app/clases/interfaces/packages/ICreatePackageDto';
import { PackageService } from 'src/app/clases/services/package.service';

@Component({
  selector: 'app-add-package-modal',
  templateUrl: './add-package-modal.component.html',
  styleUrls: ['./add-package-modal.component.css']
})
export class AddPackageModalComponent implements OnInit {

  addPackageForm: FormGroup;
  constructor(
    private packageService: PackageService,
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.addPackageForm = this._builderForm();
  }

  _builderForm() {
    // const pattern = '[a-zA-Z ]{2,254}';
    const form = this._formBuilder.group({
      program: ['', [Validators.required]],
      name: ['', [Validators.required]],
      num_clases: [null, [Validators.required]],
      days_validity: [null, [Validators.required]],
      cost: [null, [Validators.required]],
      // status: [null, [Validators.required]]     

    });

    return form;
  }

  get program() {return this.addPackageForm.controls["program"]}
  get num_clases() {return this.addPackageForm.controls["num_clases"]}
  get name() {return this.addPackageForm.controls["name"]}
  get days_validity() {return this.addPackageForm.controls["days_validity"]}
  get cost() {return this.addPackageForm.controls["cost"]}
  // get status() {return this.addPackageForm.controls["status"]}


  createPackage(){

    let payloadCreate: ICreatePackageDto = {
      program: this.program.value,
      name: this.name.value,
      num_clases: this.num_clases.value,
      cost: this.cost.value,
      days_validity: this.days_validity.value
    }
    console.log('payloadCreate', payloadCreate)

    this.packageService.createPackage(payloadCreate).subscribe((res: any) => {
      console.log('res')
    })


  }

}
