import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  standalone: false,

  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

  public showLoginForm: boolean = false;
  public showSignupForm: boolean = false;

  public toggleLoginForm() {
    this.showLoginForm = !this.showLoginForm;
  }

  public toggleSignupForm() {
    this.showSignupForm = !this.showSignupForm;
    console.log(this.showSignupForm)
  }
}
