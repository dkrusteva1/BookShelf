import { Component, OnInit } from '@angular/core';
import { IceAndFireService } from '../../services/ice-and-fire.service';
import { BookInformation } from '../../interfaces/book-information';
import { FavouriteBooksService } from '../../services/favourite-books.service';

@Component({
  selector: 'app-books-list',
  standalone: false,

  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.css'
})
export class BooksListComponent implements OnInit {
  public books: BookInformation[];
  public filteredBooks: BookInformation[] = [];
  constructor(private iceAndFireService: IceAndFireService, private favouriteBooksService: FavouriteBooksService) { }

  public ngOnInit() {
    this.iceAndFireService.getBooks().subscribe(books => {
      this.books = books.map((book: BookInformation, index: number) => ({ ...book as BookInformation, id: index + 1 }));
      this.filteredBooks = this.books;
    })
  }

  public getRouterLinkUrl(id: number): string {
    return `book/${id}`;
  }

  public updateFavouritesList(selectedBook: BookInformation): void {
    this.favouriteBooksService.updateFavouritesList(selectedBook);
  }

  public getBookStatus(id: number): boolean {
    return this.favouriteBooksService.getBookStatus(id);
  }

  public filterResults(text: string) {
    if (!text) {
      this.filteredBooks = this.books;
      return;
    }

    this.filteredBooks = this.books.filter(
      book => book?.name.toLowerCase().includes(text.toLowerCase())
    );
  }

}
