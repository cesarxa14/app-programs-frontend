import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICreateMyCustomerDto } from '../../../interfaces/ICreateMyCustomerDto';
import { MyCustomerService } from '../../../services/my-customer.service';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-add-my-customer-modal',
  templateUrl: './add-my-customer-modal.component.html',
  styleUrls: ['./add-my-customer-modal.component.css']
})
export class AddMyCustomerModalComponent implements OnInit {

  idUser: any;
  addMyCustomerForm: FormGroup;
  @Output() customer_created:any = new EventEmitter();
  constructor(
    private _formBuilder: FormBuilder,
    private myCustomerService: MyCustomerService,
    public dialogRef: MatDialogRef<AddMyCustomerModalComponent>,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.idUser = this.sharedService.getUserId();
    this.addMyCustomerForm = this._builderForm();
  }

  _builderForm() {
    // const pattern = '[a-zA-Z ]{2,254}';
    const form = this._formBuilder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
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
  get password() {return this.addMyCustomerForm.controls["password"]}
  get phone() {return this.addMyCustomerForm.controls["phone"]}
  get country() {return this.addMyCustomerForm.controls["country"]}
  get province() {return this.addMyCustomerForm.controls["province"]}
  get district() {return this.addMyCustomerForm.controls["district"]}
  get type_document() {return this.addMyCustomerForm.controls["type_document"]}
  get document() {return this.addMyCustomerForm.controls["document"]}
  get birthdate() {return this.addMyCustomerForm.controls["birthdate"]}
  get medical_history() {return this.addMyCustomerForm.controls["medical_history"]}

  createMyCustomer() {
    Swal.showLoading();
    let newMyCustomer: ICreateMyCustomerDto = {
      name: this.name.value,
      lastname: this.lastname.value,
      email: this.email.value,
      password: this.password.value,
      phone: this.phone.value,
      country: this.country.value,
      province: this.province.value,
      district: this.province.value,
      type_document: this.type_document.value,
      document: this.document.value,
      birthdate: new Date(this.birthdate.value), 
      medical_history: this.medical_history.value,
      createdBy: this.idUser
    }

    console.log('newMyCustomer: ', newMyCustomer)
    this.myCustomerService.createMyCustomer(newMyCustomer).subscribe(res => {
      console.log('res: ', res);
      Swal.close();
      Swal.fire({
        title: 'Se creó el cliente!',
        // text: 'Se inició sesión',
        icon: 'success',
        confirmButtonText: 'Ir',
        allowOutsideClick: false
      }).then((result) => {
        console.log('result: ', result)
        if(result.isConfirmed){
          this.customer_created.emit(newMyCustomer);
          this.dialogRef.close()
          
        }
      })
    })

  }

}
