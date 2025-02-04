import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksListComponent } from './books-list/books-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { RouterModule } from '@angular/router';
import { BooksFavouritesComponent } from './books-favourites/books-favourites.component';

@NgModule({
  declarations: [
    BooksListComponent,
    BookDetailComponent,
    BooksFavouritesComponent,   
  ],
  imports: [
    CommonModule, 
    RouterModule
  ], 
  exports: [
    BooksListComponent
  ],
})
export class BooksModule { }
