import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../services/auth/auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);

  if(auth.isAuthenticated()) {
    return true;
  } else {
    auth.navigateByUrl("/login");
    return false;
  }
};
