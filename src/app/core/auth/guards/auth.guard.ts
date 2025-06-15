import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { of, skip, switchMap } from 'rxjs';

export const AuthGuard: CanActivateFn = (route, state) =>
{
    try {

        const token = sessionStorage.getItem('userToken')
        const router = inject(Router);


        if(token){

            return true
        }else{
             router.navigateByUrl('/login/sign-in')
            return false
        }


    } catch (error) {

        return false
    }




};
