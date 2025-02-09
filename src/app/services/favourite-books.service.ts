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
    const currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    const string = localStorage.getItem(`${currentUser}fav`);
    return string ? JSON.parse(string) : [];
  }

  public getBookStatus(id: number): boolean {
    let likedBooks: BookInformation[] = [];
    this.likedBooks$.subscribe(books => likedBooks = books);
    return likedBooks.some(book => book.id === id);
  }

  public updateList(): void {
    this.likedBooks$.next(this.loadFromLocalStorage());
  }

  public updateFavouritesList(selectedBook: BookInformation): void {
    let likedBooks: BookInformation[] = [];
    this.likedBooks$.subscribe(books => likedBooks = books);
    const currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    if (this.getBookStatus(selectedBook.id)) {
      likedBooks = likedBooks.filter(book => book.id !== selectedBook.id);
    } else {
      likedBooks = [...likedBooks, selectedBook];
    }
    localStorage.setItem(`${currentUser}fav`, JSON.stringify(likedBooks));
    this.likedBooks$.next(likedBooks);
  }
}
