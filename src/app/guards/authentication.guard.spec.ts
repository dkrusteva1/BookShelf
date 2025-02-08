import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

import { authenticationGuard } from './authentication.guard';
import { AuthenticationService } from '../services/authentication.service';

describe('authenticationGuard', () => {

  const mockAuthService = jasmine.createSpyObj('AuthenticationService', ['isLoggedUser']);
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authenticationGuard(...guardParameters));

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthenticationService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }, 
        {provide: ActivatedRoute, 
          useValue: {
            snapshot: {}
          }
        }
      ],
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should return true if the user is logged in', async () => {
    mockAuthService.isLoggedUser.and.returnValue(true);

    const result = await TestBed.runInInjectionContext(()=> authenticationGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot));

    expect(result).toBeTrue();

  });

  
  it('should return true if the user is logged in', async () => {
    mockAuthService.isLoggedUser.and.returnValue(false);

    const result = await TestBed.runInInjectionContext(()=> authenticationGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot));

    expect(result).not.toBeTrue();

    expect(mockRouter.navigate).toHaveBeenCalledOnceWith(['./../']);

  });
});
