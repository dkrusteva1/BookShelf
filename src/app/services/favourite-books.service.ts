import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BookInformation } from '../interfaces/book-information';

@Injectable({
  providedIn: 'root'
})
export class FavouriteBooksService {
  public likedBooks$ = new BehaviorSubject<BookInformation[]>(this.loadFromLocalStorage());

  constructor() { }

  private loadFromLocalStorage(): BookInformation[] {
    const string = localStorage.getItem('favourites');
    return string ? JSON.parse(string) : [];
  }

  public getBookStatus(id: number): boolean {
    let likedBooks: BookInformation[] = [];
    this.likedBooks$.subscribe(books => likedBooks = books);
    return likedBooks.some(book => book.id === id);
  }

  public updateFavouritesList(selectedBook: BookInformation): void {
    let likedBooks: BookInformation[] = [];
    this.likedBooks$.subscribe(books => likedBooks = books);
    
    if (this.getBookStatus(selectedBook.id)) {
      likedBooks = likedBooks.filter(book => book.id !== selectedBook.id);
    } else {
      likedBooks = [...likedBooks, selectedBook];
    }
    localStorage.setItem('favourites', JSON.stringify(likedBooks));
    this.likedBooks$.next(likedBooks);
  }
}
