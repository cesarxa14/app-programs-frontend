import { Component, OnInit } from '@angular/core';
import { SaleService } from '../../services/sale.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ISalesEntity } from '../../interfaces/ISaleEntity';
import { MatDialog } from '@angular/material/dialog';
import { AddSaleModalComponent } from './add-sale-modal/add-sale-modal.component';
import { PageEvent } from '@angular/material/paginator';
import { DetailCustomerComponent } from '../../../customers/pages/detail-customer/detail-customer.component';
import { DetailSaleModalComponent } from './detail-sale-modal/detail-sale-modal.component';


@Component({
  selector: 'app-panel-sales',
  templateUrl: './panel-sales.component.html',
  styleUrls: ['./panel-sales.component.css']
})
export class PanelSalesComponent implements OnInit {

  idUser: number;
  mySalesList: ISalesEntity[] = [];
  paginatedSalesList: ISalesEntity[] = [];
  pageSize: number = 5; // Tamaño por defecto de la página
  currentPage: number = 0; 
  constructor(
    public dialog: MatDialog,
    private saleService: SaleService,
    private sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    this.idUser = this.sharedService.getUserId();
    this.getMySales();
  }

  getMySales(){
    this.saleService.getMySales(this.idUser).subscribe((res: any) => {
      console.log('res sales: ', res)
      this.mySalesList = res;
      this.updatePagination();
    })
  }

  

  abrirModalNewSale(){
    const dialogRef = this.dialog.open(AddSaleModalComponent, {
      width: '600px',
      height: 'auto',
      panelClass: 'custom-dialog'
    })

    dialogRef.componentInstance.sale_emit.subscribe((pack_add:any) => {
      console.log('prog_add: ', pack_add)
      // this.packages.unshift(pack_add)s
      this.getMySales();
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
    this.paginatedSalesList = this.mySalesList.slice(startIndex, endIndex);
  }

  viewSaleDetail(sale: ISalesEntity){
    const dialogRef = this.dialog.open(DetailSaleModalComponent, {
      width: '600px',
      height: 'auto', 
      data: sale,
      panelClass: 'custom-dialog',
    })

    // dialogRef.componentInstance.customer_edit_emit.subscribe((res:any) => {
    //   console.log('res: ', res)
    //   this.getMySales();
    // })
  }

}
