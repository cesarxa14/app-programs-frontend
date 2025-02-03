import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ISalesEntity } from '../../../interfaces/ISaleEntity';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-detail-sale-modal',
  templateUrl: './detail-sale-modal.component.html',
  styleUrls: ['./detail-sale-modal.component.css']
})
export class DetailSaleModalComponent implements OnInit {

  dateilSaleForm: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public sale: ISalesEntity,

  ) { }

  ngOnInit(): void {
    this.dateilSaleForm = this._builderForm();
    console.log('sale info: ', this.sale)
  }

  _builderForm() {
  
    const saleDateFormated = formatDate(this.sale.saleDate, 'dd/MM/yyyy', 'en-US');
    const startDateFormated = formatDate(this.sale.startDate!, 'dd/MM/yyyy', 'en-US');
      const form = this._formBuilder.group({
        customer: [{ value: this.sale.customer.name + ' ' + this.sale.customer.lastname, disabled: true }, [Validators.required]],
        category: [{ value: this.sale.category, disabled: true }, [Validators.required]],
        saleName: [{ value: this.sale.saleName, disabled: true }, [Validators.required]],
        amount: [{ value: 'S/.' + this.sale.amount, disabled: true }, [Validators.required]],
        type_voucher: [{ value: this.sale.type_voucher, disabled: true }, [Validators.required]],
        saleDate: [{ value:saleDateFormated, disabled: true }, []],
        startDate: [{ value: startDateFormated, disabled: true }, []],
        payment_method: [{ value: this.sale.payment_method, disabled: true }, [Validators.required]],
        document_customer: [{ value: this.sale.customer.document, disabled: true }, [Validators.required]],
        
      
      });
  
      return form;
    }
  
    get customer() { return this.dateilSaleForm.controls["customer"] }
    get category() { return this.dateilSaleForm.controls["category"] }
    get saleName() { return this.dateilSaleForm.controls["saleName"] }
    get amount() { return this.dateilSaleForm.controls["amount"] }
    get type_voucher() { return this.dateilSaleForm.controls["type_voucher"] }
    get saleDate() { return this.dateilSaleForm.controls["saleDate"] }
    get startDate() { return this.dateilSaleForm.controls["startDate"] }
    get payment_method() { return this.dateilSaleForm.controls["payment_method"] }
    get document_customer() { return this.dateilSaleForm.controls["document_customer"] }
    

}
