import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProgramService } from '../../../clases/services/program.service';
import { IProgramEntity } from '../../../clases/interfaces/programs/IProgramEntity';
import { SharedService } from 'src/app/shared/services/shared.service';
import { IBookEntity } from '../../interfaces/IBookEntity';
import { MyCustomerService } from '../../../customers/services/my-customer.service';
import { IUserCustomerEntity } from '../../../customers/interfaces/IUserCustomerEntity';
import { ICreateBookDto } from '../../interfaces/ICreateBookDto';
import { BookService } from '../../services/book.service';
import Swal from 'sweetalert2';
import { AutocompleteComponent } from 'angular-ng-autocomplete';
import { PreviewBookModalComponent } from './preview-book-modal/preview-book-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { SubscriptionService } from '../../../customers/services/subscription.service';

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.css']
})
export class PanelAdminComponent implements OnInit {

  idUser: number;
  idBooked: number;
  bookForm: FormGroup;
  programsList: IProgramEntity[] = [];
  bookList: IBookEntity[] = [];
  myCustomersList: IUserCustomerEntity[] = []
  autocompleteValue: string = '';

  stringSwitchFilter: string = 'Buscar por nombre';
  labelFilterInput: string = 'Nombre';
  toggleButton: boolean = false;
  @ViewChild('autocomplete') autocomplete!: AutocompleteComponent;

  startDateBook: string;
  endDateBook: string;

  activeHours: any[] = [];


  constructor(
    private _formBuilder: FormBuilder,
    private programService: ProgramService,
    private sharedService: SharedService,
    private myCustomerService: MyCustomerService,
    private bookService: BookService,
    private subscriptionService: SubscriptionService,
    public dialog: MatDialog,
  ) { }

  selectEvent(item: IUserCustomerEntity) {
    // do something with selected item
    console.log('item: ', item)
    this.document.setValue(item.document)
    this.idBooked = item.id;

    this.subscriptionService.getSubscriptionValidByUser(item.id).subscribe((res:any)=> {
      console.log('res valid: ', res);
      if(res.data.length < 1){
        alert('El usuario no tiene subscripciones validas')
      }else {
        this.getPrograms();
        this.activeHours = JSON.parse(res.data[0].activeHours);
        console.log('activeHours', this.activeHours)
      }
    })
  }


  ngOnInit(): void {
    this.idUser = this.sharedService.getUserId();
    this.bookForm = this._builderForm();
    
    this.getMyCustomers();
    this.getMyBooks();
  }

  _builderForm() {
    // const pattern = '[a-zA-Z ]{2,254}';
    const form = this._formBuilder.group({
      document: ['', [Validators.required]],
      program: [{value: '', disabled: true}, [Validators.required]],
      classDate: [{value: '', disabled: true}, [Validators.required]],
      classHour: [{value: this.activeHours, disabled: true}, [Validators.required]],
      additional_notes: [{value: '', disabled: true}],
    });

    return form;
  }

  get document() {return this.bookForm.controls["document"]}
  get program() {return this.bookForm.controls["program"]}
  get classDate() {return this.bookForm.controls["classDate"]}
  get classHour() {return this.bookForm.controls["classHour"]}
  get additional_notes() {return this.bookForm.controls["additional_notes"]}

  changeToggle(event: Event){
    const input = event.target as HTMLInputElement;
    const isChecked = input.checked; // Obtiene el estado del toggle (true/false)
    console.log('Estado del toggle:', isChecked);
    this.toggleButton = isChecked;
    if(this.toggleButton){
      this.stringSwitchFilter = 'Buscar por DNI'
      this.labelFilterInput = 'Numero de documento'
    }else {
      this.labelFilterInput = 'Nombre'
      this.stringSwitchFilter = 'Buscar por nombre'
    }
  }


  getPrograms() {
    this.programService.getPrograms(this.idUser).subscribe((res: any) =>{
      console.log('programs: ', res)
      this.programsList = res.data;
      this.program.enable();
    })
  }

  getMyCustomers() {
    this.myCustomerService.getMyCustomers().subscribe((res:any) => {
      console.log('res: ', res);
      this.myCustomersList = res.data;
      // this.myCustomersListAux = this.myCustomersList;
    })

  }

  getMyBooks() {
    this.bookService.getMyBooks().subscribe((res:any) => {
      console.log('books: ', res)
      this.bookList = res.data;
    })
  }

  onChangeSelectProgram(event: Event){
    const value = 
    console.log('event: ', this.program.value);
    const program = this.programsList.find(item => item.id == this.program.value)
    console.log('program', program);
    this.startDateBook = this.formatDate(new Date(program!.startDate)) 
    this.endDateBook = this.formatDate(new Date(program!.endDate)) 

    console.log('startDateBook', this.startDateBook)
    console.log('endDateBook', this.endDateBook)
    this.classDate.enable();
    this.classHour.enable();
    this.additional_notes.enable();
  }

  // Formatea una fecha en formato 'yyyy-MM-dd'
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  createBook() {
    const newBook: ICreateBookDto = {
      classDate: this.classDate.value,
      classHour: this.classHour.value,
      program: this.program.value,
      additional_notes: this.additional_notes.value,
      userCreator: this.idUser,
      userBooked: this.idBooked
    }

    // const dialogRef = this.dialog.open(PreviewBookModalComponent, {
    //   width: '700px',
    //   height: 'auto',
    //   data: newBook
    // })
    

    this.bookService.createBook(newBook).subscribe((res: any) => {
      console.log('book created', res)
      Swal.fire({
        title: 'Se realizó la reserva!',
        // text: 'Se inició sesión',
        icon: 'success',
        // confirmButtonText: 'Ir',
        allowOutsideClick: true
      })
      this.bookForm.reset();
      this.autocomplete.clear();
      this.getMyBooks();

    })
    
  }

}
