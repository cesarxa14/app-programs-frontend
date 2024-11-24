import { Component, OnInit } from '@angular/core';
import { AddProgramModalComponent } from './add-program-modal/add-program-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ProgramService } from '../../services/program.service';
import { EditProgramModalComponent } from './edit-program-modal/edit-program-modal.component';
import { IProgramEntity } from '../../interfaces/programs/IProgramEntity';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {

  programs: IProgramEntity[] = []
  constructor(
    public dialog: MatDialog,
    private programService: ProgramService
  ) { }

  ngOnInit(): void {
    this.getPrograms();
  }

  getPrograms(){
    this.programService.getPrograms().subscribe((res:any) => {
      console.log(res)
      this.programs = res.data;
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
      this.programs.unshift(prog_add)
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
      this.getPrograms();
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
        this.programService.deleteProgram(prog.id).subscribe((res) => {    
          console.log('eliminado: ', res)
          this.getPrograms();
        })
      } 
    })
  }

}
