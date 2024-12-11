import { Component, Inject, OnInit } from '@angular/core';
import { BookService } from '../../../services/book.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICreateBookDto } from '../../../interfaces/ICreateBookDto';
import { AssistService } from '../../../services/assist.service';
import Swal from 'sweetalert2';
import { PackageService } from 'src/app/layout/modules/clases/services/package.service';

@Component({
  selector: 'app-preview-book-modal',
  templateUrl: './preview-book-modal.component.html',
  styleUrls: ['./preview-book-modal.component.css']
})
export class PreviewBookModalComponent implements OnInit {

  countAssist: number = 0;
  totalClasses: number = 0;
  assistList: any[] = [];
  constructor(
    private bookService: BookService,
    private assistService: AssistService,
    private packageService: PackageService,
    @Inject(MAT_DIALOG_DATA) public payload: any,
  ) { }

  ngOnInit(): void {
    console.log('payload: ', this.payload)
    this.getAssistsByUserPackages();
  }

  getAssistsByUserPackages(){
    Swal.showLoading();
    this.assistService.getAssistsByUserPackages(this.payload.userBooked).subscribe((res: any) => {
      console.log('assits: ', res)
      this.assistList = res.data;
      this.countAssist = res.data.length;
      this.getNumClassesByUser();
    })
  }

  getNumClassesByUser(){
    Swal.showLoading();

    this.packageService.getNumClassesByUser(this.payload.userBooked).subscribe((res: any) => {
      Swal.close();
      console.log('pack: ', res)
      this.totalClasses = res.data[0].num_clases
    })
  }
}
