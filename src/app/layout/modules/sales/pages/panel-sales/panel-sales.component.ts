import { Component, OnInit } from '@angular/core';
import { SaleService } from '../../services/sale.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ISalesEntity } from '../../interfaces/ISaleEntity';
import { MatDialog } from '@angular/material/dialog';
import { AddSaleModalComponent } from './add-sale-modal/add-sale-modal.component';


@Component({
  selector: 'app-panel-sales',
  templateUrl: './panel-sales.component.html',
  styleUrls: ['./panel-sales.component.css']
})
export class PanelSalesComponent implements OnInit {

  idUser: number;
  mySalesList: ISalesEntity[] = [];
 
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
    })
  }

  

  abrirModalNewSale(){
    const dialogRef = this.dialog.open(AddSaleModalComponent, {
      width: '600px',
      height: 'auto',
      panelClass: 'custom-dialog'
    })
  }

}
