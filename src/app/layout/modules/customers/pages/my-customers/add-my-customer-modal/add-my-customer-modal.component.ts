import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-my-customer-modal',
  templateUrl: './add-my-customer-modal.component.html',
  styleUrls: ['./add-my-customer-modal.component.css']
})
export class AddMyCustomerModalComponent implements OnInit {

  addMyCustomerForm: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.addMyCustomerForm = this._builderForm();
  }

  _builderForm() {
    // const pattern = '[a-zA-Z ]{2,254}';
    const form = this._formBuilder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      country: ['', [Validators.required]],
      province: ['', [Validators.required]],
      district: ['', [Validators.required]],
      type_document: ['', [Validators.required]],
      document: ['', [Validators.required]],
      birthdate: [null, [Validators.required]],
      medical_history: [null, [Validators.required]],
    });

    return form;
  }

  get name() {return this.addMyCustomerForm.controls["name"]}
  get lastname() {return this.addMyCustomerForm.controls["lastname"]}
  get email() {return this.addMyCustomerForm.controls["email"]}
  get phone() {return this.addMyCustomerForm.controls["phone"]}
  get country() {return this.addMyCustomerForm.controls["country"]}
  get province() {return this.addMyCustomerForm.controls["province"]}
  get district() {return this.addMyCustomerForm.controls["district"]}
  get type_document() {return this.addMyCustomerForm.controls["type_document"]}
  get document() {return this.addMyCustomerForm.controls["document"]}
  get birthdate() {return this.addMyCustomerForm.controls["birthdate"]}
  get medical_history() {return this.addMyCustomerForm.controls["medical_history"]}

  createMyCustomer() {

  }

}
