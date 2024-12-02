import { Component, OnInit } from '@angular/core';
import { PackageService } from '../../../clases/services/package.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { IPackageEntity } from '../../../clases/interfaces/packages/IPackageEntity';
import { ModalAddCarComponent } from './modal-add-car/modal-add-car.component';
import { MatDialog } from '@angular/material/dialog';
import { IItemStoreEntity } from '../../interfaces/IItemStoreEnitity';

@Component({
  selector: 'app-store-portal',
  templateUrl: './store-portal.component.html',
  styleUrls: ['./store-portal.component.css']
})
export class StorePortalComponent implements OnInit {

  idUser: number;
  packagesList: IPackageEntity[] = []
  itemsList: IItemStoreEntity[] = [];
  constructor(
    public dialog: MatDialog,
    private packageService: PackageService,
    private sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    this.getPackagesEnables();
  }


  getPackagesEnables(){
    this.idUser = this.sharedService.getUserId();
    this.packageService.getPackagesEnables(this.idUser).subscribe((res: any) => {
      console.log('packages: ', res)
      this.packagesList = res.data;
      this.packagesList.map(item => {
        this.itemsList.push({id: item.id, amount: item.cost, name: item.name, type: 'servicio'})
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
