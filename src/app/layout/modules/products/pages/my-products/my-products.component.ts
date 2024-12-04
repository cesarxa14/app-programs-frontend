import { Component, OnInit } from '@angular/core';
import { IProductEntity } from '../../interfaces/IProductEntity';
import { SharedService } from 'src/app/shared/services/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css']
})
export class MyProductsComponent implements OnInit {

  idUser: number;
  productList: IProductEntity[] = [];
  
  constructor(
    private sharedService: SharedService,
    public dialog: MatDialog,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.getMyProducts();
  }

  getMyProducts(){
    this.productsService.getMyProducts(this.idUser).subscribe((res: any) => {
      console.log('res products: ', res)
      this.productList = res.data;
    })
  }


  abrirModalNewProduct(){

  }

}
