import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksFavouritesComponent } from './books-favourites.component';
import { FavouriteBooksService } from '../../services/favourite-books.service';
import { BookInformation } from '../../interfaces/book-information';

describe('BooksFavouritesComponent', () => {
  let component: BooksFavouritesComponent;
  let fixture: ComponentFixture<BooksFavouritesComponent>;
  let favouritesBooksService: jasmine.SpyObj<FavouriteBooksService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('FavouriteBookService',['updateFavouritesList']);
    await TestBed.configureTestingModule({
      declarations: [BooksFavouritesComponent], 
      providers: [{provide: FavouriteBooksService, useValue: spy}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksFavouritesComponent);
    component = fixture.componentInstance;
    favouritesBooksService = TestBed.inject(FavouriteBooksService) as jasmine.SpyObj<FavouriteBooksService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the service method updateFavouritesList with the selected book', () => {
    const selectedBook: BookInformation = {id: 10, name: 'Some name', authors: [], mediaType: '', numberOfPages: 476, characters: [], country: 'Bulgaria', isbn: '1234', publisher: 'Knigomaniq', released: '1999-02-02T00:00:00', url: 'https://anapioficeandfire.com/api/books/2'};
    component.updateFavouritesList(selectedBook);
    expect(favouritesBooksService.updateFavouritesList).toHaveBeenCalledOnceWith(selectedBook);
  });

});

