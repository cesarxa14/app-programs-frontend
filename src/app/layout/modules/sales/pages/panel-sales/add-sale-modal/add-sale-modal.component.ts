import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutocompleteComponent } from 'angular-ng-autocomplete';
import { IPackageEntity } from 'src/app/layout/modules/clases/interfaces/packages/IPackageEntity';
import { PackageService } from 'src/app/layout/modules/clases/services/package.service';
import { IUserCustomerEntity } from 'src/app/layout/modules/customers/interfaces/IUserCustomerEntity';
import { MyCustomerService } from 'src/app/layout/modules/customers/services/my-customer.service';
import { IItemStoreEntity } from 'src/app/layout/modules/store/interfaces/IItemStoreEnitity';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ICreateSaleDto } from '../../../interfaces/ICreateSaleDto';
import { SaleService } from '../../../services/sale.service';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from 'src/app/layout/modules/products/services/products.service';
import { IProductEntity } from 'src/app/layout/modules/products/interfaces/IProductEntity';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-sale-modal',
  templateUrl: './add-sale-modal.component.html',
  styleUrls: ['./add-sale-modal.component.css']
})
export class AddSaleModalComponent implements OnInit {

  idUser: number;
  addSaleForm: FormGroup;
  itemStoreList: IItemStoreEntity[] = [];
  itemStoreSelect: IItemStoreEntity = { amount: 0, name: '', type: 'servicio' };
  packagesList: IPackageEntity[] = [];
  productList: IProductEntity[] = [];
  myCustomersList: IUserCustomerEntity[] = [];
  @Output() sale_emit: any = new EventEmitter();

  today: string;

  costSale: number;
  igv: number;
  igv_fee: number;
  totalSale: number;

  customerData: IUserCustomerEntity;

  @ViewChild('autocomplete') autocomplete!: AutocompleteComponent;

  constructor(
    private _formBuilder: FormBuilder,
    private sharedService: SharedService,
    private packageService: PackageService,
    private productService: ProductsService,
    private myCustomerService: MyCustomerService,
    private saleService: SaleService,
    public dialogRef: MatDialogRef<AddSaleModalComponent>,
    private toastr: ToastrService

  ) { }

  ngOnInit(): void {
    this.idUser = this.sharedService.getUserId();
    this.addSaleForm = this._builderForm();
    // this.getMyPackages();
    this.today = this.formatDate(new Date())
    this.getMyCustomers();
    this.changeCategoryValue();
    this.onSaleItemChange();
    this.changeTypeVoucher()
    this.addSaleForm.get('saleItem')?.valueChanges.subscribe((selectedValue) => {
      console.log(selectedValue)
      // this.addSaleForm.get('selectedItemValue')?.setValue(selectedValue);
    });
  }

  _builderForm() {

    const form = this._formBuilder.group({
      category: [null, [Validators.required]],
      saleItem: [{ value: null, disabled: true }, [Validators.required]],
      type_voucher: [null, [Validators.required]],
      startDate: ['', []],
      payment_method: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      customerFullName: [{ value: '', disabled: true }, [Validators.required]],
    });

    return form;
  }

  get category() { return this.addSaleForm.controls["category"] }
  get saleItem() { return this.addSaleForm.controls["saleItem"] }
  get type_voucher() { return this.addSaleForm.controls["type_voucher"] }
  get payment_method() { return this.addSaleForm.controls["payment_method"] }
  get amount() { return this.addSaleForm.controls["amount"] }
  get customerFullName() { return this.addSaleForm.controls["customerFullName"] }
  get startDate() { return this.addSaleForm.controls["startDate"] }

  

  getMyPackages() {
    this.packageService.getPackages(this.idUser).subscribe((res: any) => {
      console.log(res)
      this.packagesList = res.data;
      this.itemStoreList = this.packagesList.map(p => {
        return {
          id: p.id,
          amount: p.cost,
          name: p.program + " - " + p.name,
          type: 'servicio',
        }
      })

    })
  }

  getProducts() {
    this.productService.getMyProducts(this.idUser).subscribe((res: any) => {
      console.log(res)
      this.productList = res.data;
      this.itemStoreList = this.productList.map(p => {
        return {
          id: p.id,
          amount: p.price_sale,
          name: p.name,
          type: 'producto',
        }
      })

    })
  }

  getMyCustomers() {
    this.myCustomerService.getMyCustomers(this.idUser).subscribe((res: any) => {
      console.log('res: ', res);
      this.myCustomersList = res.data;
      // this.myCustomersListAux = this.myCustomersList;
    })

  }

  onSaleItemChange() {

    this.saleItem?.valueChanges.subscribe(value => {
      console.log('value saleItem: ', value)
      this.itemStoreSelect = value;
      this.amount.setValue(this.itemStoreSelect.amount)
      this.costSale = this.itemStoreSelect.amount;
      this.igv = this.costSale * this.igv_fee;
      this.totalSale = this.costSale + this.igv
    })
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

  changeTypeVoucher(){
    this.type_voucher.valueChanges.subscribe(res => {
      console.log('res: ', res)
      if(res !== 'nota_venta'){
        this.igv_fee = 0.18
      }else {
        this.igv_fee = 0
      }

      this.costSale = this.itemStoreSelect.amount;
      this.igv = this.costSale * this.igv_fee;
      this.totalSale = this.costSale + this.igv
    })
  }

  changeCategoryValue() {
    // this.saleItem.reset();
    this.saleItem.setValue([])
    this.category.valueChanges.subscribe(value => {
      console.log('Valor cambiado:', value);
      if (value == 'servicio') {
        // if(this.itemStoreList.length == 0){
        this.getMyPackages();
        // }
        this.saleItem.enable();
      } else if (value == 'producto') {
        // this.saleItem.disable();
        // if(this.itemStoreList.length == 0){
        this.getProducts();
        // }
        this.saleItem.enable();
      }
    });

  }

  selectEventAutocomplete(item: IUserCustomerEntity) {
    this.customerData = item;
    this.customerFullName.setValue(`${this.customerData.name} ${this.customerData.lastname}`);
  }


  createSale() {
    const localDate = new Date();
    const saleDate = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000); // Ajusta la fecha a la zona horaria local (Perú es UTC-5)
    Swal.showLoading();
    const newSalePayload: ICreateSaleDto = {
      amount: this.amount.value,
      category: this.category.value,
      igv: this.amount.value * 0.18,
      payment_method: this.payment_method.value,
      saleDate: saleDate,//new Date(),
      saleName: this.itemStoreSelect.name,
      itemId: this.itemStoreSelect.id || -1,
      type_voucher: this.type_voucher.value,
      sellerId: this.idUser,
      customerId: this.customerData.id,
      startDate: this.startDate.value
    }

    console.log(newSalePayload)
    // return;

    this.saleService.createSale(newSalePayload).subscribe((res: any) => {
      console.log('res sale:', res)
      Swal.close();
      Swal.fire({
        title: 'Se creó la venta!',
        // text: 'Se inició sesión',
        icon: 'success',
        confirmButtonText: 'Ir',
        allowOutsideClick: false
      }).then((result) => {
        console.log('result: ', result)
        if (result.isConfirmed) {
          this.sale_emit.emit(res);
          this.dialogRef.close()

        }
      })
    }, (err) => {
      console.log('error: ', err)
      Swal.close();
      this.toastr.error(err.error.message)
      // alert(err.error.message)
    })
  }


}
