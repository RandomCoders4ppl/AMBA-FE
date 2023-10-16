import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Service/auth.service';
import { inject } from '@angular/core';

export const RoleGuard: CanActivateFn = (route, state) => {
  const JwtAuth : AuthService = inject(AuthService);
  const router : Router = inject(Router);
  console.log("Current Route : "+route)
  if(JwtAuth.isLoggedIn())
       return true;
  else{
    router.navigate(['/login'])
    return false;
  }
};
