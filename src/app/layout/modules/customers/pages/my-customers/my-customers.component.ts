import { Component, OnInit } from '@angular/core';
import { IUserCustomerEntity } from '../../interfaces/IUserCustomerEntity';
import { AddMyCustomerModalComponent } from './add-my-customer-modal/add-my-customer-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MyCustomerService } from '../../services/my-customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditMyCustomerModalComponent } from './edit-my-customer-modal/edit-my-customer-modal.component';
import Swal from 'sweetalert2';
import { SharedService } from 'src/app/shared/services/shared.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-my-customers',
  templateUrl: './my-customers.component.html',
  styleUrls: ['./my-customers.component.css']
})
export class MyCustomersComponent implements OnInit {

  idUser: any;
  searchForm: FormGroup;
  myCustomersList: IUserCustomerEntity[] = []
  myCustomersListAux: IUserCustomerEntity[] = []
  paginatedCustomerList: IUserCustomerEntity[] = [];
  filteredCustomersList: any[] = [];
  pageSize: number = 5; // Tamaño por defecto de la página
  currentPage: number = 0;

  constructor(
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private myCustomerService: MyCustomerService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.idUser = this.sharedService.getUserId();
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
      this.filteredCustomersList = [...this.myCustomersListAux];
    } else{
      this.myCustomersList = this.myCustomersListAux.filter(s => {
        return s.name.toLowerCase().includes(filterValue) || s.lastname.toLowerCase().includes(filterValue) 
      })
      this.filteredCustomersList = this.myCustomersListAux.filter(s => {
        return s.name.toLowerCase().includes(filterValue) || 
               s.lastname.toLowerCase().includes(filterValue);
      });
    }

    this.currentPage = 0;
    this.updatePaginatedList();
  }

  updatePaginatedList() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedCustomerList = this.filteredCustomersList.slice(startIndex, endIndex);
  }

  getMyCustomers() {
    this.myCustomerService.getMyCustomers(this.idUser).subscribe((res:any) => {
      console.log('res: ', res);
      this.myCustomersList = res.data;
      this.myCustomersListAux = this.myCustomersList;
      this.updatePagination();
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

    Swal.fire({
      title: '¿Estás seguro que deseas eliminar el cliente?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.myCustomerService.deleteCustomer(customer.id).subscribe((res: any)=> {
          console.log('res: ', res)
          this.getMyCustomers()
        })
      } 
    })

    
  }

  
  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePagination();
  }
  updatePagination() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedCustomerList = this.myCustomersList.slice(startIndex, endIndex);
  }


}