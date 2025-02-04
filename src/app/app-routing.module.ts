import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { BooksListComponent } from './books/books-list/books-list.component';
import { BooksFavouritesComponent } from './books/books-favourites/books-favourites.component';

const routes: Routes = [
  { path: '', component: BooksListComponent },
  { path: 'book/:id', component: BookDetailComponent },
  { path: 'favourites', component: BooksFavouritesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
