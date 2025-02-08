import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: false,
  
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(private router: Router) {}

    signupForm = new FormGroup({
      username: new FormControl('', Validators.compose([Validators.email, Validators.required])), 
      password: new FormControl('', Validators.minLength(5)),
      confirmPassword: new FormControl('', Validators.minLength(5))
    }, {validators: this.validateConfirmPassword});
  
    onSubmit() {
      const username = this.signupForm.value.username;
      const password = this.signupForm.value.password;
      localStorage.setItem(username!, JSON.stringify(password));
      localStorage.setItem('currentUser', JSON.stringify(username));
      this.router.navigate(['./books/home']);
    };

    private validateConfirmPassword(signupForm: AbstractControl): {notSame: boolean} | null{
      return signupForm.value.confirmPassword === signupForm.value.password ? null : {notSame: true};
    };
}
