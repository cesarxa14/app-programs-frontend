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

  @ViewChild('autocomplete') autocomplete!: AutocompleteComponent;


  options: string[] = ['Perú', 'Argentina', 'Colombia', 'Chile', 'México'];
filteredOptions: string[] = [];
inputValue: string = '';
  constructor(
    private _formBuilder: FormBuilder,
    private programService: ProgramService,
    private sharedService: SharedService,
    private myCustomerService: MyCustomerService,
    private bookService: BookService
  ) { }

  selectEvent(item: IUserCustomerEntity) {
    // do something with selected item
    console.log('item: ', item)
    this.document.setValue(item.document)
    this.idBooked = item.id;
  }


  ngOnInit(): void {
    this.idUser = this.sharedService.getUserId();
    this.bookForm = this._builderForm();
    this.getPrograms();
    this.getMyCustomers();
    this.getMyBooks();
  }

  _builderForm() {
    // const pattern = '[a-zA-Z ]{2,254}';
    const form = this._formBuilder.group({
      document: ['', [Validators.required]],
      program: ['', [Validators.required]],
      classDate: ['', [Validators.required]],
      classHour: ['', [Validators.required]],
      additional_notes: [''],
    });

    return form;
  }

  get document() {return this.bookForm.controls["document"]}
  get program() {return this.bookForm.controls["program"]}
  get classDate() {return this.bookForm.controls["classDate"]}
  get classHour() {return this.bookForm.controls["classHour"]}
  get additional_notes() {return this.bookForm.controls["additional_notes"]}



  getPrograms() {
    this.programService.getPrograms(this.idUser).subscribe((res: any) =>{
      console.log('programs: ', res)
      this.programsList = res.data;
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


  createBook() {
    const newBook: ICreateBookDto = {
      classDate: this.classDate.value,
      classHour: this.classHour.value,
      program: this.program.value,
      additional_notes: this.additional_notes.value,
      userCreator: this.idUser,
      userBooked: this.idBooked
    }

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
      

    })
    
  }

}
