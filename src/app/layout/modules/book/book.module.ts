import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent } from './book.component';
import { BookRoutingModule } from './book-routing.module';
import { MyBooksComponent } from './pages/my-books/my-books.component';
import { RegisterBookComponent } from './pages/register-book/register-book.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreviewBookModalComponent } from './pages/preview-book-modal/preview-book-modal.component';



@NgModule({
  declarations: [
    BookComponent,
    MyBooksComponent,
    RegisterBookComponent,
    PreviewBookModalComponent
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    AutocompleteLibModule,
    FormsModule, 
    ReactiveFormsModule,
  ]
})
export class BookModule { }
