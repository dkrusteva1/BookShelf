import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { BooksListComponent } from './books/books-list/books-list.component';
import { BooksFavouritesComponent } from './books/books-favourites/books-favourites.component';
import { LandingComponent } from './landing/landing.component';
import { authenticationGuard } from './authentication.guard';

const routes: Routes = [
  {path: '', component: LandingComponent},
  { path: 'home', component: BooksListComponent, canLoad: [authenticationGuard] },
  { path: 'book/:id', component: BookDetailComponent, canLoad: [authenticationGuard] },
  { path: 'favourites', component: BooksFavouritesComponent, canLoad: [authenticationGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
