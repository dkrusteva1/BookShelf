import { Component, OnChanges, OnInit } from '@angular/core';
import { BookInformation } from '../../interfaces/book-information';
import { FavouriteBooksService } from '../../services/favourite-books.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-books-favourites',
  standalone: false,
  
  templateUrl: './books-favourites.component.html',
  styleUrl: './books-favourites.component.css'
})
export class BooksFavouritesComponent{

  public likedBooks$: Observable<BookInformation[]> = of([]);

  constructor(private favouritesBooksService: FavouriteBooksService){
    this.likedBooks$ = this.favouritesBooksService.likedBooks$; 
  }

  public updateFavouritesList(book: BookInformation) : void {
    this.favouritesBooksService.updateFavouritesList(book);
  }
}
