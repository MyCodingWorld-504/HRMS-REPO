import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { NgToastService } from 'ng-angular-popup';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(NgToastService);


    if(authService.isLoggedIn()){
      return true
    }else{
    toastr.error({detail:"ERROR", summary:"Please Login First!"});
   
      router.navigate(['login'])
      return false;
    }

};
