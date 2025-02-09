import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksListComponent } from './books-list.component';
import { IceAndFireService } from '../../services/ice-and-fire.service';
import { FavouriteBooksService } from '../../services/favourite-books.service';
import { provideHttpClient } from '@angular/common/http';
import { BookInformation } from '../../interfaces/book-information';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from '../../services/authentication.service';

describe('BooksListComponent', () => {
  let component: BooksListComponent;
  let fixture: ComponentFixture<BooksListComponent>;
  let iceAndFireService: IceAndFireService;
  let favouriteBooksService: FavouriteBooksService;
  let authService: AuthenticationService;


  const mockBooks = [{name: 'Mock Book1 ', authors: ['Author 1'], released: '2000-01-01' },
  { name: 'Mock Book 2', authors: ['Author 2'], released: '2000-01-01' },
  { name: 'Mock Book 3', authors: ['Author 3'], released: '2000-01-01' }] as BookInformation[];

  const expectedMockBooks = [{id: 1, name: 'Mock Book1 ', authors: ['Author 1'], released: '2000-01-01' },
  { id: 2, name: 'Mock Book 2', authors: ['Author 2'], released: '2000-01-01' },
  {id: 3,  name: 'Mock Book 3', authors: ['Author 3'], released: '2000-01-01' }] as BookInformation[];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('FavouriteBookService', ['getBookStatus', 'updateFavouritesList', 'updateList']);

    const spyIceAndFireService = {
      getBooks: jasmine.createSpy('getBooks').and.returnValue(of(mockBooks))
    };

    const spyAuthService = jasmine.createSpyObj('AuthenticationService', ['logout']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [BooksListComponent],
      providers: [provideHttpClient(),
      { provide: IceAndFireService, useValue: spyIceAndFireService },
      {provide: FavouriteBooksService,useValue: spy}, 
      {provide: AuthenticationService, useValue: spyAuthService}
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(BooksListComponent);
    iceAndFireService = TestBed.inject(IceAndFireService);
    favouriteBooksService = TestBed.inject(FavouriteBooksService);
    authService = TestBed.inject(AuthenticationService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should make call to the service to fetch the data for the books on ngOnInit and set the books`ids', () => {
    component.ngOnInit();
    expect(iceAndFireService.getBooks).toHaveBeenCalled();
    fixture.detectChanges();
    expect(component.books).toEqual(expectedMockBooks);
  });

  it('should make the correct url link', () => {
    const result = component.getRouterLinkUrl(1);
    expect(result).toEqual('./../1')
  });

  it('should call the getBookStatus from the favouriteBook service when getBookStatus is called', () => {
    component.getBookStatus(1);
    expect(favouriteBooksService.getBookStatus).toHaveBeenCalledWith(1);
  });

  it('should call the updateFavouritesList from the favouriteBook service when updateFavouritesList is called', () => {
    component.updateFavouritesList({ name: 'Some book name' } as BookInformation);
    expect(favouriteBooksService.updateFavouritesList).toHaveBeenCalledOnceWith({ name: 'Some book name' } as BookInformation);
  });

  it('should filter the books correctly and return the expected filtered array', () => {
    component.filterResults('Book1');
    expect(component.filteredBooks).toEqual([{id: 1, name: 'Mock Book1 ', authors: ['Author 1'], released: '2000-01-01' }] as BookInformation[]);
  });

  it('should call the authentication service on logout button click', () => {
    component.logout();
    expect(authService.logout).toHaveBeenCalledTimes(1);
  })
});
