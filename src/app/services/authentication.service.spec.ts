import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  const localStorageKey = 'currentUser';

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationService);

    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return key === localStorageKey ? JSON.stringify({username: 'some@email', password: '12345'}) : null;
    });

    spyOn(localStorage, 'setItem').and.callFake(() => {});

    spyOn(localStorage, 'removeItem').and.callFake(() => {});
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the correct username on getCurrentUrser()', () => {
    const user = service.getCurrentUser();
    expect(user).toEqual({ username: 'some@email', password: '12345' } as any);
  });

  it('should return true if the user is logged in', () => {
    expect(service.isLoggedUser()).toBeTrue();
  });

  it('should return false if there is not logged in user', () => {
    (localStorage.getItem as jasmine.Spy).and.returnValue(null);
    const user = service.getCurrentUser();
    expect(user).toBeNull();
  });

  it('should delete from local storage current user on logout()', ()=> {
    service.logout();
    expect(localStorage.removeItem).toHaveBeenCalledWith(localStorageKey);
  })
});
