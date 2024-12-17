import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProgramEntity } from '../../../clases/interfaces/programs/IProgramEntity';
import { IBookEntity } from '../../../assistance/interfaces/IBookEntity';
import { IUserCustomerEntity } from '../../../customers/interfaces/IUserCustomerEntity';
import { AutocompleteComponent } from 'angular-ng-autocomplete';
import { ProgramService } from '../../../clases/services/program.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { MyCustomerService } from '../../../customers/services/my-customer.service';
import { BookService } from '../../../assistance/services/book.service';
import { SubscriptionService } from '../../../customers/services/subscription.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { PreviewBookModalComponent } from '../preview-book-modal/preview-book-modal.component';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-book',
  templateUrl: './register-book.component.html',
  styleUrls: ['./register-book.component.css']
})
export class RegisterBookComponent implements OnInit {

  idUser: number;
  customerInfo: any;
  roleId: string;
  idBooked: number;
  bookForm: FormGroup;
  bookCustomerForm: FormGroup;
  programsList: IProgramEntity[] = [];
  bookList: IBookEntity[] = [];
  myCustomersList: IUserCustomerEntity[] = []
  autocompleteValue: string = '';

  stringSwitchFilter: string = 'Buscar por nombre';
  labelFilterInput: string = 'Nombre';
  toggleButton: boolean = false;
  userInfo: any = '';
  programInfo: any;
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
    private userService: UserService,
    private subscriptionService: SubscriptionService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.idUser = this.sharedService.getUserId();
    this.roleId = this.sharedService.getRoleId();
    
    if(this.roleId == '1'){
      this.bookForm = this._builderForm();
    }else if(this.roleId == '3'){
      this.bookCustomerForm = this._builderForm2();
      this.onInitCustomer();

    }
    this.getMyCustomers();
    this.getMyBooks();
  }

  onInitCustomer(){
    this.userService.getUserById(this.idUser).subscribe((res: any) => {
      console.log('res: ', res)
      this.customerInfo = res.data;
      // this.getPrograms(this.customerInfo.id)
      this.subscriptionService.getSubscriptionValidByUser(this.customerInfo.id).subscribe((res:any)=> {
        console.log('res valid: ', res);
        if(res.data.length < 1){
          alert('El usuario no tiene subscripciones validas')
        }else {
          this.getPrograms(this.customerInfo.id);
          this.activeHours = JSON.parse(res.data[0].activeHours);
          console.log('activeHours', this.activeHours)
        }
      })
    })
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


  _builderForm2() {
    // const pattern = '[a-zA-Z ]{2,254}';
    const form = this._formBuilder.group({
      program2: [{value: ''}, [Validators.required]],
      classDate2: [{value: ''}, [Validators.required]],
      classHour2: [{value: this.activeHours}, [Validators.required]],
      additional_notes2: [''],
    });

    return form;
  }

  get program2() {return this.bookCustomerForm.controls["program2"]}
  get classDate2() {return this.bookCustomerForm.controls["classDate2"]}
  get classHour2() {return this.bookCustomerForm.controls["classHour2"]}
  get additional_notes2() {return this.bookCustomerForm.controls["additional_notes2"]}

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
  selectEvent(item: IUserCustomerEntity) {
    // do something with selected item
    console.log('item: ', item)
    this.document.setValue(item.document)
    this.idBooked = item.id;
    this.userInfo = item

    this.subscriptionService.getSubscriptionValidByUser(item.id).subscribe((res:any)=> {
      console.log('res valid: ', res);
      if(res.data.length < 1){
        alert('El usuario no tiene subscripciones validas')
      }else {
        this.getPrograms(item.id);
        this.activeHours = JSON.parse(res.data[0].activeHours);
        console.log('activeHours', this.activeHours)
      }
    })
  }


  getPrograms(id: number) {
    Swal.showLoading();
    this.programService.getProgramsBuyedByCustomer(id).subscribe((res: any) =>{
      Swal.close();
      console.log('programs: ', res)
      this.programsList = res.data;
      this.program.enable();
    })
  }

  getMyCustomers() {
    this.myCustomerService.getMyCustomers(this.idUser).subscribe((res:any) => {
      console.log('res: ', res);
      this.myCustomersList = res.data;
      // this.myCustomersListAux = this.myCustomersList;
    })

  }

  getMyBooks() {
    let params = {
      limit: true
    }
    this.bookService.getMyBooks(params).subscribe((res:any) => {
      console.log('books: ', res)
      this.bookList = res.data;
    })
  }

  onChangeSelectProgram(event: Event){
    const value = 
    console.log('event: ', this.program.value);
    const program = this.programsList.find(item => item.id == this.program.value)
    console.log('program', program);
    this.programInfo = program;
    this.startDateBook = this.formatDate(new Date(program!.startDate)) 
    this.endDateBook = this.formatDate(new Date(program!.endDate)) 

    console.log('startDateBook', this.startDateBook)
    console.log('endDateBook', this.endDateBook)
    this.classDate.enable();
    this.classHour.enable();
    this.additional_notes.enable();
  }

  onChangeSelectProgram2(event: Event){
    const value = 
    console.log('event: ', this.program2.value);
    const program = this.programsList.find(item => item.id == this.program2.value)
    console.log('program', program);
    this.programInfo = program;
    this.startDateBook = this.formatDate(new Date(program!.startDate)) 
    this.endDateBook = this.formatDate(new Date(program!.endDate)) 

    console.log('startDateBook', this.startDateBook)
    console.log('endDateBook', this.endDateBook)
  }

  // Formatea una fecha en formato 'yyyy-MM-dd'
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  createBook() {
    const newBook = {
      classDate: this.classDate.value,
      classHour: this.classHour.value,
      program: this.programInfo,
      additional_notes: this.additional_notes.value,
      userCreator: this.idUser,
      userBooked: this.idBooked,
      type: this.labelFilterInput,
      userInfo: this.userInfo

    }

    const dialogRef = this.dialog.open(PreviewBookModalComponent, {
      width: '700px',
      height: 'auto',
      data: newBook,
      panelClass: 'custom-dialog'
    })

    dialogRef.componentInstance.book_emit.subscribe((book_add:any) => {
      console.log('prog_add: ', book_add)
      // this.programs.unshift(prog_add)
      this.router.navigate(['/pages/books/my-books']);
    })
    

    // this.bookService.createBook(newBook).subscribe((res: any) => {
    //   console.log('book created', res)
    //   Swal.fire({
    //     title: 'Se realizó la reserva!',
    //     // text: 'Se inició sesión',
    //     icon: 'success',
    //     // confirmButtonText: 'Ir',
    //     allowOutsideClick: true
    //   })
    //   this.bookForm.reset();
    //   this.autocomplete.clear();
    //   this.getMyBooks();

    // })
    
  }

  createBookCustomer(){
    const newBook = {
      classDate: this.classDate2.value,
      classHour: this.classHour2.value,
      program: this.programInfo,
      additional_notes: this.additional_notes2.value,
      userCreator: this.idUser,
      userBooked: this.idUser,
      type: this.labelFilterInput,
      userInfo: this.customerInfo
    }

    const dialogRef = this.dialog.open(PreviewBookModalComponent, {
      width: '700px',
      height: 'auto',
      data: newBook,
      panelClass: 'custom-dialog'
    })

    dialogRef.componentInstance.book_emit.subscribe((book_add:any) => {
      console.log('prog_add: ', book_add)
      // this.programs.unshift(prog_add)
      this.router.navigate(['/pages/books/my-books']);
    })
  }

}
