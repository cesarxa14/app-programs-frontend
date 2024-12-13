import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './book.component';
import { MyBooksComponent } from './pages/my-books/my-books.component';
import { RegisterBookComponent } from './pages/register-book/register-book.component';


const routes: Routes = [
  {
    path: '', 
    component: BookComponent,
    children: [
        { path: '', redirectTo: 'my-books', pathMatch: 'full' },
        { path: 'my-books'   , component: MyBooksComponent},
        { path: 'register-book'   , component: RegisterBookComponent},
    ]
  }
]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class BookRoutingModule { }