import { Component, OnInit } from '@angular/core';
import { BookInformation } from '../../interfaces/book-information';
import { IceAndFireService } from '../../services/ice-and-fire.service';
import { ActivatedRoute } from '@angular/router';
import { FavouriteBooksService } from '../../services/favourite-books.service';

@Component({
  selector: 'app-book-detail',
  standalone: false,
  
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent implements OnInit{
  
  public book: BookInformation;
  public id: string;

  constructor(private iceAndFireService: IceAndFireService, private favouriteBooksService: FavouriteBooksService, private activatedRoute: ActivatedRoute ){}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params["id"];
    this.iceAndFireService.getBookById(this.id).subscribe(book=> {
      this.book = {...book, id: parseInt(this.id)}
    });
  }
  
  public getBookStatus(id: number): boolean {
   return this.favouriteBooksService.getBookStatus(id); 
  }

  public updateFavouritesList(selectedBook: BookInformation): void {
    this.favouriteBooksService.updateFavouritesList(selectedBook);
  }
}
