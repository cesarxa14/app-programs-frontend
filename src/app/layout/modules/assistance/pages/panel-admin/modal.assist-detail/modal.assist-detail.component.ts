import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AssistService } from '../../../services/assist.service';
import Swal from 'sweetalert2';
import { PackageService } from 'src/app/layout/modules/clases/services/package.service';
import { InfoToModalDetail } from '../panel-admin.component';

@Component({
  selector: 'app-modal.assist-detail',
  templateUrl: './modal.assist-detail.component.html',
  styleUrls: ['./modal.assist-detail.component.css']
})
export class ModalAssistDetailComponent implements OnInit {

  countAssist: number = 0;
  totalClasses: number = 0;
  assistList: any[] = [];
  @Output() modal_emit:any = new EventEmitter();
  constructor(
    @Inject(MAT_DIALOG_DATA) public payload: InfoToModalDetail,
    private assistService: AssistService,
    public dialogRef: MatDialogRef<ModalAssistDetailComponent>,
    private packageService: PackageService,
  ) { }

  ngOnInit(): void {
    console.log('payload: ', this.payload)
    this.getAssistsByUserPackages();
  }

  getAssistsByUserPackages(){
    Swal.showLoading();
    this.assistService.getAssistsByUserPackages(this.payload.studentId).subscribe((res: any) => {
      console.log('assits: ', res)
      this.assistList = res.data;
      this.countAssist = res.data.length;
      this.getNumClassesByUser();
    })
  }

  getNumClassesByUser(){
    Swal.showLoading();

    this.packageService.getNumClassesByUser(this.payload.studentId).subscribe((res: any) => {
      Swal.close();
      console.log('pack: ', res)
      this.totalClasses = res.data[0].num_clases
    })
  }

  closeModal(){
    this.dialogRef.close();
    this.modal_emit.emit();
  }

}
