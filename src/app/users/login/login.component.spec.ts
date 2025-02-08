import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent], 
      imports: [
        ReactiveFormsModule, 
        FormsModule, 
        RouterTestingModule.withRoutes([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.loginForm.setValue({
      username: 'some@email', 
      password: '123'
    });
    expect(component).toBeTruthy();
  });

  it('should submit the form if the user exists', () => {
    const navigateSpy = spyOn(router, 'navigate');
    localStorage.setItem('some@email', JSON.stringify('123'));
    component.loginForm.setValue({
      username: 'some@email', 
      password: '123'
    });
    component.onSubmit();
    expect(navigateSpy).toHaveBeenCalledOnceWith(['./books/home']);
  });

  it('should not submit the form if the user doesnt exist', () => {
    const navigateSpy = spyOn(router, 'navigate');
    localStorage.setItem('some@email', JSON.stringify('1234'));
    component.loginForm.setValue({
      username: 'some@email', 
      password: '123'
    });
    component.onSubmit();
    expect(navigateSpy).not.toHaveBeenCalled();
  });
});
