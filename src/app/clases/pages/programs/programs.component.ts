import { Component, OnInit } from '@angular/core';
import { AddProgramModalComponent } from './add-program-modal/add-program-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ProgramService } from '../../services/program.service';
import { EditProgramModalComponent } from './edit-program-modal/edit-program-modal.component';
import { IProgramEntity } from '../../interfaces/programs/IProgramEntity';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {

  programs: IProgramEntity[] = [{
    name: 'name example',
    description: 'desc example',
    startDate: '2023/01/01',
    endDate: '01/01/2024',
  }]
  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  abrirModal() {
    console.log('abrir')
    const dialogRef = this.dialog.open(AddProgramModalComponent, {
      width: '700px',
      height: 'auto',
    })

   
  }

  editModal(prog: any){
    const dialogRef = this.dialog.open(EditProgramModalComponent, {
      width: '700px',
      height: 'auto',
      data: prog
    })
  }

}
