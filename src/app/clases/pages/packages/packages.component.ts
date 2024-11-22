import { Component, OnInit } from '@angular/core';
import { IPackageEntity } from '../../interfaces/packages/IPackageEntity';
import { MatDialog } from '@angular/material/dialog';
import { AddPackageModalComponent } from './add-package-modal/add-package-modal.component';
import { EditPackageModalComponent } from './edit-package-modal/edit-package-modal.component';
import { PackageService } from '../../services/package.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {

  packages: IPackageEntity[] = [
    {
      name: 'Hola',
      cost: 3,
      days_validity: 3,
      num_clases: 3,
      program: 'Hola',
      status: 'Success'
    }
  ]
  constructor(
    private packageService: PackageService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getPackages();
  }

  getPackages(){
    this.packageService.getPackages().subscribe((res:any) => {
      console.log(res)
      this.packages = res.data;
    })
  }

  abrirModal() {
    console.log('abrir')
    const dialogRef = this.dialog.open(AddPackageModalComponent, {
      width: '700px',
      height: 'auto',
    })

   
  }

  editModal(pack: any){
    const dialogRef = this.dialog.open(EditPackageModalComponent, {
      width: '700px',
      height: 'auto',
      data: pack
    })
  }

}
