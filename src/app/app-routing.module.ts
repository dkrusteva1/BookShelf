import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authenticationGuard } from './guards/authentication.guard';

const routes: Routes = [
  {
    path: 'books',
    canActivateChild: [authenticationGuard],
    loadChildren: () => import('./books/books-routing.module').then(m => m.BooksRoutingModule)
  },
  { path: '', loadChildren: () => import('./users/users-routing.module').then(m => m.UsersRoutingModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
