import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../services/auth/auth-service';

export const autoLoginGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);

  if(auth.isAuthenticated()) {
      // auth.navigateByUrl("/dashboard");
      return false;
  }
  else {
    return true;
  }
};
