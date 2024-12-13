import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../assistance/services/book.service';
import { IBookEntity } from '../../../assistance/interfaces/IBookEntity';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})
export class MyBooksComponent implements OnInit {

  idUser: number;
  role: any;
  bookList: IBookEntity[] = [];
  constructor(
    private bookService: BookService,
    private sharedService: SharedService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.idUser = this.sharedService.getUserId();
    this.role = this.sharedService.getRoleId();
    this.getBooks();
  }

  getBooks(){
    if(this.role == 1){
      this.getMyBooksAdmin();
    }else if(this.role == 3){
      this.getMyBooksCustomer();
    }
  }

  getMyBooksAdmin(){
    this.bookService.getMyBooksAdmin(this.idUser).subscribe((res: any) => {
      console.log('res: ', res)
      this.bookList = res.data;
    })
  }

  getMyBooksCustomer(){
    this.bookService.getMyBooksCustomer(this.idUser).subscribe((res: any) => {
      console.log('res: ', res)
      this.bookList = res.data;
    })
  }

  goToNewBook(){
    this.router.navigateByUrl('/pages/books/register-book')
  }

}
