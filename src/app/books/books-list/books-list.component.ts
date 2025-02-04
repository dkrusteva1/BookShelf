import { Component, OnInit } from '@angular/core';
import { IceAndFireService } from '../../services/ice-and-fire.service';
import { BookInformation } from '../../interfaces/book-information';

@Component({
  selector: 'app-books-list',
  standalone: false,

  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.css'
})
export class BooksListComponent implements OnInit {
  public books: BookInformation[];
  public likedBooks: BookInformation[] = [];
  public filteredBooks: BookInformation[] = [];
  constructor(private iceAndFireService: IceAndFireService) { }

  public ngOnInit() {
    const string = localStorage.getItem('favourites');
    if (string) this.likedBooks = JSON.parse(string);
    this.iceAndFireService.getBooks().subscribe(books => {
      this.books = books.map((book: BookInformation, index: number) => ({ ...book as BookInformation, id: index + 1 }));
      this.filteredBooks = this.books;
    })
  }

  public getRouterLinkUrl(id: number): string {
    return `book/${id}`;
  }

  public updateFavouritesList(selectedBook: BookInformation): void {
    if (this.likedBooks?.includes(selectedBook)) {
      this.likedBooks = this.likedBooks.filter(function (item) {
        return item.id !== selectedBook.id
      })
    } else {
      this.likedBooks.push(selectedBook);
    }
    let likedBoks: string = JSON.stringify(this.likedBooks);
    localStorage.setItem('favourites', likedBoks);
  }

  public getBookStatus(id: number): boolean {
    return this.likedBooks?.find(book => book.id == id) != undefined ? true : false;
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredBooks = this.books;
      return;
    }

    this.filteredBooks = this.books.filter(
      book => book?.name.toLowerCase().includes(text.toLowerCase())
    );
  }

}
