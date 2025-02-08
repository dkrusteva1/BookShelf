import { Component } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm = new FormGroup({
    username: new FormControl('', Validators.email), 
    password: new FormControl('', Validators.minLength(5))
  });

  constructor(private router: Router){}

  onSubmit() {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
  

    if(username && password) {
      const pass = JSON.parse(localStorage.getItem(username)!);
      localStorage.setItem('currentUser', JSON.stringify(username));

    if (pass === password) {
        this.router.navigate(['./books/home']);
     }
    }
  };
}
