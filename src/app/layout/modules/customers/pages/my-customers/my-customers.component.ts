import { Component, OnInit } from '@angular/core';
import { IUserCustomerEntity } from '../../interfaces/IUserCustomerEntity';
import { AddMyCustomerModalComponent } from './add-my-customer-modal/add-my-customer-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MyCustomerService } from '../../services/my-customer.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EditMyCustomerModalComponent } from './edit-my-customer-modal/edit-my-customer-modal.component';
import Swal from 'sweetalert2';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-my-customers',
  templateUrl: './my-customers.component.html',
  styleUrls: ['./my-customers.component.css']
})
export class MyCustomersComponent implements OnInit {
  searchForm: FormGroup;
  myCustomersList: IUserCustomerEntity[] = [];
  myCustomersListAux: IUserCustomerEntity[] = [];
  paginatedCustomers: IUserCustomerEntity[] = [];
  pageSize: number = 5; // Tamaño por defecto de la página
  currentPage: number = 0;

  constructor(
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private myCustomerService: MyCustomerService
  ) {}

  ngOnInit(): void {
    this.searchForm = this._builderSearchForm();
    this.getMyCustomers();
  }

  _builderSearchForm() {
    const form = this._formBuilder.group({
      search: [null],
    });
    return form;
  }

  get search() {
    return this.searchForm.controls['search'];
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (filterValue === '') {
      this.myCustomersList = [...this.myCustomersListAux];
    } else {
      this.myCustomersList = this.myCustomersListAux.filter((s) =>
        s.name.toLowerCase().includes(filterValue) || s.lastname.toLowerCase().includes(filterValue)
      );
    }
    this.updatePagination();
  }

  getMyCustomers() {
    this.myCustomerService.getMyCustomers().subscribe((res: any) => {
      this.myCustomersList = res.data;
      this.myCustomersListAux = [...this.myCustomersList];
      this.updatePagination();
    });
  }

  updatePagination() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedCustomers = this.myCustomersList.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePagination();
  }

  abrirModal() {
    const dialogRef = this.dialog.open(AddMyCustomerModalComponent, {
      width: '600px',
      height: '600px',
    });

    dialogRef.componentInstance.customer_created.subscribe(() => {
      this.getMyCustomers();
    });
  }

  viewDetail(customer: IUserCustomerEntity) {}

  editModal(customer: IUserCustomerEntity) {
    const dialogRef = this.dialog.open(EditMyCustomerModalComponent, {
      width: '600px',
      height: '600px',
      data: customer,
    });

    dialogRef.componentInstance.customer_edit_emit.subscribe(() => {
      this.getMyCustomers();
    });
  }

  deleteCustomer(customer: IUserCustomerEntity) {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar el cliente?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.myCustomerService.deleteCustomer(customer.id).subscribe(() => {
          this.getMyCustomers();
        });
      }
    });
  }
}
