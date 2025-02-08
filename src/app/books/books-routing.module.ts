import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksListComponent } from './books-list/books-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BooksFavouritesComponent } from './books-favourites/books-favourites.component';

const routes: Routes = [
  { path: 'home', component: BooksListComponent},
  { path: 'favourites', component: BooksFavouritesComponent},
  { path: ':id', component: BookDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
