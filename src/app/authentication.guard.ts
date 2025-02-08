import { CanActivateFn } from '@angular/router';

export const authenticationGuard: CanActivateFn = (route, state) => {
  return true;
  // if (JSON.parse(localStorage.getItem('currentUser')!) != null) {
  //   return true; // Allow access if the user is authenticated
  // } else {
  //   this.router.navigate(['']); // Redirect to login if not authenticated
  //   return false; // Prevent access to the route
  // }
};
