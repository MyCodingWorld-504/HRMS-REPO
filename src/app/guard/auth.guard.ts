import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastrService);
// return false;
  if (authService.isLoggedIn()) {
    // toastr.success( 'Access ');
    return true;
  } else {
    toastr.error('Unauthenticated', 'Access Denied');
    router.navigate(['layout']);
return false;
  }
};
