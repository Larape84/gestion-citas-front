import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { InicioSesionService } from 'app/modules/auth/sign-in/inicio-sesion.service';
import { of, switchMap } from 'rxjs';

export const NoAuthGuard: CanActivateFn | CanActivateChildFn = (route, state) =>
{
    const router: Router = inject(Router);
    const inicioSesion: InicioSesionService = inject(InicioSesionService)


    try {
        const isLoggedIn = inicioSesion.isLoggedIn();
        if (isLoggedIn) {
            router.navigateByUrl('/app');
            return false;
        }else{
            return true
        }
    } catch (error) {
        inicioSesion.eliminarUsuario();
        router.navigateByUrl('sign-in');
        return true;
    }




};
