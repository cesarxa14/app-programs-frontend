import { Component, OnInit } from '@angular/core';
import { PackageService } from '../../../clases/services/package.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { IPackageEntity } from '../../../clases/interfaces/packages/IPackageEntity';
import { ModalAddCarComponent } from './modal-add-car/modal-add-car.component';
import { MatDialog } from '@angular/material/dialog';
import { IItemStoreEntity } from '../../interfaces/IItemStoreEnitity';
import { ProductsService } from '../../../products/services/products.service';
import { IProductEntity } from '../../../products/interfaces/IProductEntity';

@Component({
  selector: 'app-store-portal',
  templateUrl: './store-portal.component.html',
  styleUrls: ['./store-portal.component.css']
})
export class StorePortalComponent implements OnInit {

  imageDefault: string ='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg/220px-Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg'
  idUser: number;
  packagesList: IPackageEntity[] = [];
  productsList: IProductEntity[] = [];
  itemsList: IItemStoreEntity[] = [];
  constructor(
    public dialog: MatDialog,
    private packageService: PackageService,
    private productService: ProductsService,
    private sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    this.getPackagesEnables();
    this.getProducts();
  }


  getPackagesEnables(){
    this.idUser = this.sharedService.getUserId();
    this.packageService.getPackagesEnables(this.idUser).subscribe((res: any) => {
      console.log('packages: ', res)
      this.packagesList = res.data;
      this.packagesList.map(item => {
        this.itemsList.push({id: item.id, amount: item.cost, name: item.name, type: 'servicio', phone_owner: item.phone})
      })
    })
  }

  getProducts(){
    this.productService.getProducts().subscribe((res:any) => {
      console.log('res products: ', res)
      this.productsList = res.data;
      // this.productsList.map(item => {
      //   this.itemsList.push({id: item.id, amount: item.price_sale, name: item.name, type: 'producto', phone_owner: item.phone_owner, image: item.image})
      // })

      this.itemsList = this.productsList.map(item => {
        return {id: item.id, amount: item.price_sale, name: item.name, type: 'producto', phone_owner: item.phone_owner, image: item.image}
      })
    })
  }

  addToCar(item: any){
    const dialogRef = this.dialog.open(ModalAddCarComponent, {
      width: '500px',
      height: 'auto',
      data: item
    })

  }



}
