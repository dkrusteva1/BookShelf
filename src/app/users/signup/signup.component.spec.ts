import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupComponent], 
      imports: [
        ReactiveFormsModule, 
        FormsModule, 
        RouterTestingModule.withRoutes([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.signupForm.setValue({
      username: 'some@email', 
      password: '123', 
      confirmPassword: '123'
    });
    expect(component).toBeTruthy();
  });

  it('should navigate to books page when data is valid', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.signupForm.setValue({
      username: 'some@email', 
      password: '123', 
      confirmPassword: '123'
    });
    component.onSubmit();
    expect(navigateSpy).toHaveBeenCalledWith(['./books/home']);
  });

  it('should not navigate to home page when data is not valild', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.signupForm.setValue({
      username: 'some@email', 
      password: '123', 
      confirmPassword: '12345'
    });
    component.onSubmit();
    expect(component.signupForm.errors).toEqual({notSame: true})
  });
});
