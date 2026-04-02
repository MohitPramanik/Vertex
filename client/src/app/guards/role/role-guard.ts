import { inject } from '@angular/core';
import { CanActivateChildFn } from '@angular/router';
import { AuthService } from '../../services/auth/auth-service';

export const roleGuard: CanActivateChildFn = (childRoute, state) => {
  const auth = inject(AuthService);

  const requiredRole = childRoute.data['role'];
  console.log(requiredRole);

  if(auth.hasRole(requiredRole)) {
    return true;
  }
  else {
    auth.navigateByUrl("/dashboard");
    return false;
  }
};
