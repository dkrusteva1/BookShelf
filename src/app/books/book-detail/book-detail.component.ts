import { Component, OnInit } from '@angular/core';
import { BookInformation } from '../../interfaces/book-information';
import { Observable, of, switchMap } from 'rxjs';
import { IceAndFireService } from '../../services/ice-and-fire.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  standalone: false,
  
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent implements OnInit{
  
  public book: BookInformation;
  public likedBooks: BookInformation[];
  public id: string;

  constructor(private iceAndFireService: IceAndFireService, private activatedRoute: ActivatedRoute ){}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params["id"];
    this.iceAndFireService.getBookById(this.id).subscribe(book=> this.book = book);
    const string = localStorage.getItem('favourites');
    if (string) this.likedBooks = JSON.parse(string);
  }

  
  public getBookStatus(id: number): boolean {
    return this.likedBooks?.find(book => book.id == id) != undefined ? true : false;
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

}
