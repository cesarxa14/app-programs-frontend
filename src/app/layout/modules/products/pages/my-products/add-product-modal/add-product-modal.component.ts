import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ICreateProductDto } from '../../../interfaces/ICreateProductDto';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.css']
})
export class AddProductModalComponent implements OnInit {

  addProductForm: FormGroup;
  isStatusChecked: boolean = true;
  idUser: number;
  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddProductModalComponent>,
    private sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    this.idUser = this.sharedService.getUserId();
    this.addProductForm = this._builderForm();
    this.getValueChangesStatus();
  }

  _builderForm() {
    // const pattern = '[a-zA-Z ]{2,254}';
    const form = this._formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      status: ['', [Validators.required]],
      price_sale: ['', [Validators.required]],
      image: ['', [Validators.required]],
     
    });

    return form;
  }

  

  get name() {return this.addProductForm.controls["name"]}
  get description() {return this.addProductForm.controls["description"]}
  get quantity() {return this.addProductForm.controls["quantity"]}
  get status() {return this.addProductForm.controls["status"]}
  get price_sale() {return this.addProductForm.controls["price_sale"]}
  get image() {return this.addProductForm.controls["image"]}

  getValueChangesStatus() {
    this.addProductForm.get('status')?.valueChanges.subscribe((newValue) => {
      console.log('El valor cambió:', newValue);
      this.isStatusChecked = newValue
      // Aquí puedes ejecutar tu lógica
    });

  }

  createProduct(){
    const payloadCreate: ICreateProductDto = {
      name: this.name.value,
      description: this.description.value,
      quantity: this.quantity.value,
      status: 'HABILITADO',
      price_sale: this.price_sale.value,
      image: this.image.value,
      user_id: this.idUser
    }
  }

}
