import { Component, OnInit } from '@angular/core';
import { BookInformation } from '../../interfaces/book-information';

@Component({
  selector: 'app-books-favourites',
  standalone: false,
  
  templateUrl: './books-favourites.component.html',
  styleUrl: './books-favourites.component.css'
})
export class BooksFavouritesComponent implements OnInit{

  public likedBooks: BookInformation[] = [];
  ngOnInit(): void {
    const string = localStorage.getItem('favourites');
    if (string) this.likedBooks = JSON.parse(string);
  }

  public removeFromFav(book: BookInformation) : void {
    this.likedBooks = this.likedBooks.filter(obj => {return obj !== book});
    localStorage.setItem('favourites', JSON.stringify(this.likedBooks));
  }
  
}
