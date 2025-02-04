import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksFavouritesComponent } from './books-favourites.component';

describe('BooksFavouritesComponent', () => {
  let component: BooksFavouritesComponent;
  let fixture: ComponentFixture<BooksFavouritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BooksFavouritesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksFavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
