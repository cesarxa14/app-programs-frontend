import { Component, OnInit } from '@angular/core';
import { IUserCustomerEntity } from '../../interfaces/IUserCustomerEntity';
import { AddMyCustomerModalComponent } from './add-my-customer-modal/add-my-customer-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MyCustomerService } from '../../services/my-customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditMyCustomerModalComponent } from './edit-my-customer-modal/edit-my-customer-modal.component';

@Component({
  selector: 'app-my-customers',
  templateUrl: './my-customers.component.html',
  styleUrls: ['./my-customers.component.css']
})
export class MyCustomersComponent implements OnInit {

  searchForm: FormGroup;
  myCustomersList: IUserCustomerEntity[] = []
  myCustomersListAux: IUserCustomerEntity[] = []
  constructor(
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private myCustomerService: MyCustomerService
  ) { }

  ngOnInit(): void {
    this.searchForm = this._builderSearchForm();
    this.getMyCustomers();
  }

  _builderSearchForm() {
    // const pattern = '[a-zA-Z ]{2,254}';
    const form = this._formBuilder.group({
      search: [null],
    });

    return form;
  }

  get search() {return this.searchForm.controls["search"]}

  // Filtro de Búsqueda
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if(filterValue == ''){
      this.myCustomersList = this.myCustomersListAux;
    } else{
      this.myCustomersList = this.myCustomersListAux.filter(s => {
        return s.name.toLowerCase().includes(filterValue) || s.lastname.toLowerCase().includes(filterValue) 
      })
    }
  }

  getMyCustomers() {
    this.myCustomerService.getMyCustomers().subscribe((res:any) => {
      console.log('res: ', res);
      this.myCustomersList = res.data;
      this.myCustomersListAux = this.myCustomersList;
    })

  }

  abrirModal() {
    console.log('abrir')
    const dialogRef = this.dialog.open(AddMyCustomerModalComponent, {
      width: '600px',
      height: '600px',
    })

    dialogRef.componentInstance.customer_created.subscribe((res:any) => {
      console.log('res: ', res)
      this.getMyCustomers();
    })

   
  }

  viewDetail(customer: IUserCustomerEntity){
    
  }

  editModal(customer: IUserCustomerEntity){
    const dialogRef = this.dialog.open(EditMyCustomerModalComponent, {
      width: '600px',
      height: '600px', 
      data: customer
    })

    dialogRef.componentInstance.customer_edit_emit.subscribe((res:any) => {
      console.log('res: ', res)
      this.getMyCustomers();
    })
  }

  deleteCustomer(customer: IUserCustomerEntity) {

  }

}
