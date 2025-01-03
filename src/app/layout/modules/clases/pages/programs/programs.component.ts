import { Component, OnInit } from '@angular/core';
import { AddProgramModalComponent } from './add-program-modal/add-program-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ProgramService } from '../../services/program.service';
import { EditProgramModalComponent } from './edit-program-modal/edit-program-modal.component';
import { IProgramEntity } from '../../interfaces/programs/IProgramEntity';
import Swal from 'sweetalert2';
import { SharedService } from 'src/app/shared/services/shared.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {

  idUser: number;
  programs: IProgramEntity[] = [];
  paginatedPrograms: IProgramEntity[] = [];
  pageSize: number = 5; // Tamaño por defecto de la página
  currentPage: number = 0;
  constructor(
    public dialog: MatDialog,
    private programService: ProgramService,
    private sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    this.idUser = this.sharedService.getUserId();
    this.getPrograms(this.idUser);

  }

  getPrograms(idUser: number){
    this.programService.getPrograms(idUser).subscribe((res:any) => {
      console.log(res)
      this.programs = res.data;
      this.updatePagination();
    })
    
  }

  abrirModal() {
    console.log('abrir')
    const dialogRef = this.dialog.open(AddProgramModalComponent, {
      width: '700px',
      height: 'auto',
    })

    dialogRef.componentInstance.program_emit.subscribe((prog_add:any) => {
      console.log('prog_add: ', prog_add)
      this.getPrograms(this.idUser);
    })

   
  }

  editModal(prog: any){
    const dialogRef = this.dialog.open(EditProgramModalComponent, {
      width: '700px',
      height: 'auto',
      data: prog
    })

    dialogRef.componentInstance.program_edit_emit.subscribe((prog_add:any) => {
      console.log('prog_add: ', prog_add)
      // this.programs.unshift(prog_add)
      this.getPrograms(this.idUser);
    })
  }

  deleteProgram(prog: IProgramEntity){
    // console.log('prod', prod)
    // console.log('index', index)
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar el programa?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.showLoading();
        this.programService.deleteProgram(prog.id).subscribe((res) => {    
          console.log('eliminado: ', res)
          this.getPrograms(this.idUser);
          Swal.close();
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
    this.paginatedPrograms = this.programs.slice(startIndex, endIndex);
  }

}
