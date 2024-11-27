import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IUserCustomerEntity } from '../../../interfaces/IUserCustomerEntity';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyCustomerService } from '../../../services/my-customer.service';
import { IEditMyCustomerDto } from '../../../interfaces/IEditMyCustomerDto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-my-customer-modal',
  templateUrl: './edit-my-customer-modal.component.html',
  styleUrls: ['./edit-my-customer-modal.component.css']
})
export class EditMyCustomerModalComponent implements OnInit {

  editCustomerForm: FormGroup;
  @Output() customer_edit_emit:any = new EventEmitter();
  constructor(
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public customer: IUserCustomerEntity,
    public dialogRef: MatDialogRef<EditMyCustomerModalComponent>,
    private myCustomerService: MyCustomerService
  ) { }

  ngOnInit(): void {
    this.editCustomerForm = this._builderForm();
  }

  _builderForm() {
    // const pattern = '[a-zA-Z ]{2,254}';
    const form = this._formBuilder.group({
      name: [this.customer.name, [Validators.required]],
      lastname: [this.customer.lastname, [Validators.required]],
      email: [this.customer.email, [Validators.required]],
      phone: [this.customer.phone, [Validators.required]],
      country: [this.customer.country, [Validators.required]],
      province: [this.customer.province, [Validators.required]],
      district: [this.customer.district, [Validators.required]],
      type_document: [this.customer.type_document, [Validators.required]],
      document: [this.customer.document, [Validators.required]],
      birthdate: [ '', [Validators.required]],
      medical_history: [this.customer.medical_history, [Validators.required]]     
    });

    form.get('birthdate')!.patchValue(this.formatDate(this.customer.birthdate));

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

  get name() {return this.editCustomerForm.controls["name"]}
  get lastname() {return this.editCustomerForm.controls["lastname"]}
  get email() {return this.editCustomerForm.controls["email"]}
  get phone() {return this.editCustomerForm.controls["phone"]}
  get country() {return this.editCustomerForm.controls["country"]}
  get province() {return this.editCustomerForm.controls["province"]}
  get district() {return this.editCustomerForm.controls["district"]}
  get type_document() {return this.editCustomerForm.controls["type_document"]}
  get document() {return this.editCustomerForm.controls["document"]}
  get birthdate() {return this.editCustomerForm.controls["birthdate"]}
  get medical_history() {return this.editCustomerForm.controls["medical_history"]}

  editCustomer() {
    const customerEdited: IEditMyCustomerDto = {
      name: this.name.value,
      lastname: this.lastname.value,
      email: this.email.value,
      phone: this.phone.value,
      country: this.country.value,
      province: this.province.value,
      district: this.district.value,
      type_document: this.type_document.value,
      document: this.document.value,
      birthdate: this.birthdate.value,
      medical_history: this.medical_history.value,
    }
    this.myCustomerService.editCustomer(customerEdited, this.customer.id).subscribe(res => {
      console.log('res: ', res)
      Swal.fire({
        title: 'Se editó el cliente!',
        // text: 'Se inició sesión',
        icon: 'success',
        confirmButtonText: 'Ir',
        allowOutsideClick: false
      }).then((result) => {
        console.log('result: ', result)
        if(result.isConfirmed){
          this.customer_edit_emit.emit(customerEdited);
          this.dialogRef.close()
          
        }
      })
    })


  }

}
