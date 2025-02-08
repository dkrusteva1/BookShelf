import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUser = 'currentUser';
  constructor() { }

  public getCurrentUser(): string {
    const string = localStorage.getItem(this.currentUser);
    return JSON.parse(string!);
  }

  public isLoggedUser(): boolean {
    const string = localStorage.getItem(this.currentUser);
    if (string) {
      return true;
    }
    return false;
  }

  public logout(): void {
    localStorage.removeItem(this.currentUser);
  }
}
