import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Service/auth.service';
import { inject } from '@angular/core';

export const RoleGuard: CanActivateFn = (route, state) => {
  const JwtAuth : AuthService = inject(AuthService);
  const router : Router = inject(Router);
  if(route.url.toString().includes('admin',0) && JwtAuth.isLoggedIn() && JwtAuth.getRole()==='USER'){
     router.navigate([''])
     return false
  }
  else if(JwtAuth.isLoggedIn())
       return true;
  else{
    router.navigate(['/login'])
    return false;
  }
};
