import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../../authorization/services/authentication.service';
import { inject } from '@angular/core';

export const loggedinGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  const isLoggedIn = await authService.getUserProfileAsync();

  if (isLoggedIn.id != "Not user session") {
    localStorage.setItem('firstName', isLoggedIn.firstName);
    return true
  }
  
  localStorage.setItem('firstName', "");
  return router.createUrlTree(['/login']);
};
