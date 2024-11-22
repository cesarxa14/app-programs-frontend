import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IEditPackageDto } from 'src/app/clases/interfaces/packages/IEditPackageDto';
import { IPackageEntity } from 'src/app/clases/interfaces/packages/IPackageEntity';
import { PackageService } from 'src/app/clases/services/package.service';

@Component({
  selector: 'app-edit-package-modal',
  templateUrl: './edit-package-modal.component.html',
  styleUrls: ['./edit-package-modal.component.css']
})
export class EditPackageModalComponent implements OnInit {

  editPackageForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public packag: IPackageEntity,
    private _formBuilder: FormBuilder,
    private packageService: PackageService
  ) { }

  ngOnInit(): void {
    this.editPackageForm = this._builderForm();
  }

  _builderForm() {
    // const pattern = '[a-zA-Z ]{2,254}';
    const form = this._formBuilder.group({
      program: [this.packag.program, [Validators.required]],
      name: [this.packag.name, [Validators.required]],
      num_clases: [this.packag.num_clases, [Validators.required]],
      days_validity: [this.packag.days_validity, [Validators.required]],
      cost: [this.packag.cost, [Validators.required]],

    });

    return form;
  }

  get program() {return this.editPackageForm.controls["program"]}
  get num_clases() {return this.editPackageForm.controls["num_clases"]}
  get name() {return this.editPackageForm.controls["name"]}
  get days_validity() {return this.editPackageForm.controls["days_validity"]}
  get cost() {return this.editPackageForm.controls["cost"]}

  editPackage(){
    let payloadEdit: IEditPackageDto = {
      program: this.program.value,
      name: this.name.value,
      cost: this.cost.value,
      days_validity: this.days_validity.value,
      num_clases: this.num_clases.value
    }

    this.packageService.editPackage(payloadEdit).subscribe((res: any) => {
      console.log('res')
    })
  }

}
