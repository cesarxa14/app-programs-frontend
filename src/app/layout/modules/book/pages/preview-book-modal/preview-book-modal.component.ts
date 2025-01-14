import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { BookService } from '../../../assistance/services/book.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICreateBookDto } from '../../../assistance/interfaces/ICreateBookDto';
import { AssistService } from '../../../assistance/services/assist.service';
import Swal from 'sweetalert2';
import { PackageService } from 'src/app/layout/modules/clases/services/package.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-preview-book-modal',
  templateUrl: './preview-book-modal.component.html',
  styleUrls: ['./preview-book-modal.component.css']
})
export class PreviewBookModalComponent implements OnInit {

  roleId: any;
  countAssist: number = 0;
  totalClasses: number = 0;
  assistList: any[] = [];
  messageAssistOverLimit: string;
  @Output() book_emit:any = new EventEmitter();
  constructor(
    private bookService: BookService,
    private assistService: AssistService,
    private packageService: PackageService,
    @Inject(MAT_DIALOG_DATA) public payload: any,
    public dialogRef: MatDialogRef<PreviewBookModalComponent>,
    private sharedService: SharedService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.roleId = this.sharedService.getRoleId();
    console.log('payload: ', this.payload)
    this.messageAssistOverLimit = this.roleId == 1 ? 'No tiene clases restantes, el cliente necesita comprar un nuevo paquete.': 'No tienes clases restantes, necesitas comprar un nuevo paquete.'

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

  createBook(){
    Swal.showLoading();
    const payloadCreateBook: ICreateBookDto = {
      classDate: this.payload.classDate,
      classHour: this.payload.classHour,
      program: this.payload.program,
      userBooked: this.payload.userBooked,
      userCreator: this.payload.userCreator,
      additional_notes: this.payload.additional_notes
    }

    this.bookService.createBook(payloadCreateBook).subscribe((res: any) => {
      console.log('created book: ', res)
      Swal.close();
      Swal.fire({
        title: 'Se creó la reserva!',
        // text: 'Se inició sesión',
        icon: 'success',
        confirmButtonText: 'Ir',
        allowOutsideClick: false
      }).then((result) => {
        console.log('result: ', result)
        if(result.isConfirmed){
          this.book_emit.emit(res);
          this.dialogRef.close()
          
        }
      })
      
    },  (err) => {
      console.log('error: ', err)
      Swal.close();
      this.toastr.success('Hello world!', 'Toastr fun!');
      // alert(err.error.message)
      this.toastr.error(err.error.message)
    })
  }
}
