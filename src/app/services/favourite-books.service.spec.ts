import { TestBed } from '@angular/core/testing';

import { FavouriteBooksService } from './favourite-books.service';
import { BookInformation } from '../interfaces/book-information';

describe('FavouriteBooksService', () => {
  let service: FavouriteBooksService;

  beforeEach(() => { 
    var store: any = {};
    spyOn(localStorage, 'getItem').and.callFake( (key:string): string => {
      return store[key] || null;
     });

     spyOn(localStorage, 'setItem').and.callFake((key:string, value:string):string =>  {
      return store[key] = <string>value;
    });

    TestBed.configureTestingModule({
      providers: []
    });
    service = TestBed.inject(FavouriteBooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get if the book is liked or not when calling getBookStatus', () => {
    const result = service.getBookStatus(1);
    expect(result).toBeFalse();
  });

  it('should not have book with id 1 in the storage, add it and the should persist', () => {
    // the book should not be in the local storage
    const beforeUpdate = service.getBookStatus(1);
    expect(beforeUpdate).toBeFalse();
    // update the local storage with book id 1
    service.updateFavouritesList({id: 1, name: 'Some name'} as BookInformation);
    const afterUpdate = service.getBookStatus(1);
    expect(afterUpdate).toBeTrue();
    // update again and the book should not be liked
    service.updateFavouritesList({id: 1, name: 'Some name'} as BookInformation);
    const afterUpdate2 = service.getBookStatus(1);
    expect(afterUpdate2).toBeFalse();
  });
});

