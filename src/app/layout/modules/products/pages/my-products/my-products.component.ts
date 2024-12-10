import { Component, OnInit } from '@angular/core';
import { IProductEntity } from '../../interfaces/IProductEntity';
import { SharedService } from 'src/app/shared/services/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { ProductsService } from '../../services/products.service';
import { AddProductModalComponent } from './add-product-modal/add-product-modal.component';
import Swal from 'sweetalert2';

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
    this.idUser = this.sharedService.getUserId();
    this.getMyProducts();
  }

  getMyProducts(){
    this.productsService.getMyProducts(this.idUser).subscribe((res: any) => {
      console.log('res products: ', res)
      this.productList = res.data;
    })
  }


  abrirModalNewProduct(){
    console.log('abrir')
    const dialogRef = this.dialog.open(AddProductModalComponent, {
      width: '600px',
      height: '600px',
    })

    dialogRef.componentInstance.product_emit.subscribe((pack_add:any) => {
      console.log('prog_add: ', pack_add)
      // this.packages.unshift(pack_add)s
      this.getMyProducts();
    })
  }

  deleteProduct(prod: IProductEntity){
    // console.log('prod', prod)
    // console.log('index', index)
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar el producto?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productsService.deleteProduct(prod.id).subscribe((res) => {    
          console.log('eliminado: ', res)
          this.getMyProducts();
        })
      } 
    })
  }

}
