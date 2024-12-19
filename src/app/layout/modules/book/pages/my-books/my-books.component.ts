import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../assistance/services/book.service';
import { IBookEntity } from '../../../assistance/interfaces/IBookEntity';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})
export class MyBooksComponent implements OnInit {

  idUser: number;
  role: any;
  bookList: IBookEntity[] = [];
  paginatedBookList: IBookEntity[] = [];
  pageSize: number = 5; // Tamaño por defecto de la página
  currentPage: number = 0; 
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
      this.updatePagination()
    })
  }

  getMyBooksCustomer(){
    this.bookService.getMyBooksCustomer(this.idUser).subscribe((res: any) => {
      console.log('res: ', res)
      this.bookList = res.data;
      this.updatePagination()
    })
  }

  goToNewBook(){
    this.router.navigateByUrl('/pages/books/register-book')
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePagination();
  }
  updatePagination() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedBookList = this.bookList.slice(startIndex, endIndex);
  }

}
