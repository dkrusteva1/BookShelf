import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailComponent } from './book-detail.component';
import { IceAndFireService } from '../../services/ice-and-fire.service';
import { FavouriteBooksService } from '../../services/favourite-books.service';
import { ActivatedRoute } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { BookInformation } from '../../interfaces/book-information';
import { of } from 'rxjs';


describe('BookDetailComponent', () => {
  let component: BookDetailComponent;
  let fixture: ComponentFixture<BookDetailComponent>;
  let iceAndFireService: IceAndFireService;
  let favouriteBooksService: FavouriteBooksService;
  let activatedRoute: ActivatedRoute;
  const mockBook = { name: 'Mock Book', authors: ['Author 1'], released: '2000-01-01' } as BookInformation;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('FavouriteBookService', ['getBookStatus', 'updateFavouritesList']);

    const spyIceAndFireService = {
      getBookById: jasmine.createSpy('getBookById').and.returnValue(of(mockBook)) 
    };
    const activatedRouteMock = {
      snapshot: { params: { id: '1' } }
    };


    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [BookDetailComponent],
      providers: [provideHttpClient(),
      { provide: FavouriteBooksService, useValue: spy },
      { provide: ActivatedRoute, useValue: activatedRouteMock }, 
      { provide: IceAndFireService, useValue: spyIceAndFireService }],
    })
      .compileComponents();

    fixture = TestBed.createComponent(BookDetailComponent);
    iceAndFireService = TestBed.inject(IceAndFireService);
    favouriteBooksService = TestBed.inject(FavouriteBooksService);
    activatedRoute = TestBed.inject(ActivatedRoute);


    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should make call to the service to fetch the data for the book on ngOnInit and set the book id', () => {
    component.ngOnInit();
    expect(component.id).toBe('1');
    expect(iceAndFireService.getBookById).toHaveBeenCalledWith('1');

    fixture.detectChanges();

    expect(component.book).toEqual({ ...mockBook, id: 1 });

  });

  it('should call the getBookStatus from the favouriteBook service when getBookStatus is called', () => {
    component.getBookStatus(1);
    expect(favouriteBooksService.getBookStatus).toHaveBeenCalledWith(1);
  });

  it('should call the updateFavouritesList from the favouriteBook service when updateFavouritesList is called', () => {
    component.updateFavouritesList({ name: 'Some book name' } as BookInformation);
    expect(favouriteBooksService.updateFavouritesList).toHaveBeenCalledOnceWith({ name: 'Some book name' } as BookInformation);
  });
});
