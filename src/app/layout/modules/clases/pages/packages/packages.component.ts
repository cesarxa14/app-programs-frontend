import { Component, OnInit } from '@angular/core';
import { IPackageEntity } from '../../interfaces/packages/IPackageEntity';
import { MatDialog } from '@angular/material/dialog';
import { AddPackageModalComponent } from './add-package-modal/add-package-modal.component';
import { EditPackageModalComponent } from './edit-package-modal/edit-package-modal.component';
import { PackageService } from '../../services/package.service';
import Swal from 'sweetalert2';
import { SharedService } from 'src/app/shared/services/shared.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {

  idUser: number;
  packages: IPackageEntity[] = [];
  paginatedPackages: IPackageEntity[] = [];
  pageSize: number = 5; // Tamaño por defecto de la página
  currentPage: number = 0;

  constructor(
    private packageService: PackageService,
    public dialog: MatDialog,
    private sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    this.idUser = this.sharedService.getUserId();
    this.getPackages();
  }

  getPackages(){
    this.packageService.getPackages(this.idUser).subscribe((res:any) => {
      console.log(res)
      this.packages = res.data;
      this.updatePagination();
    })
  }

  abrirModal() {
    console.log('abrir')
    const dialogRef = this.dialog.open(AddPackageModalComponent, {
      width: '700px',
      height: 'auto',
      panelClass: 'custom-dialog'
    })

    dialogRef.componentInstance.package_emit.subscribe((pack_add:any) => {
      console.log('prog_add: ', pack_add)
      // this.packages.unshift(pack_add)s
      this.getPackages();
    })

  }

  editModal(pack: any){
    const dialogRef = this.dialog.open(EditPackageModalComponent, {
      width: '700px',
      height: 'auto',
      data: pack,
      panelClass: 'custom-dialog',

    })

    dialogRef.componentInstance.package_edit_emit.subscribe((pack_add:any) => {
      // console.log('prog_add: ', pack_add)
      // this.packages.unshift(pack_add)
      this.getPackages();
    })

    
  }

  deletePackage(prog: IPackageEntity){
    // console.log('prod', prod)
    // console.log('index', index)
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar el paquete?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.packageService.deletePackage(prog.id).subscribe((res) => {    
          console.log('eliminado: ', res)
          this.getPackages();
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
    this.paginatedPackages = this.packages.slice(startIndex, endIndex);
  }


}
