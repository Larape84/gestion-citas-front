import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { InicioSesionService } from 'app/modules/auth/sign-in/inicio-sesion.service';
import { of, switchMap } from 'rxjs';

export const NoAuthGuard: CanActivateFn | CanActivateChildFn = (route, state) =>
{

    try {


        const router = inject(Router);



        const token = sessionStorage.getItem('userToken')

        if(token){
            router.navigateByUrl('/app')
            return false
        }else{
            return true
        }


    } catch (error) {

        return true
    }




};
