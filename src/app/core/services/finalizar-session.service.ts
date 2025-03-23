import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { InicioSesionService } from 'app/modules/auth/sign-in/inicio-sesion.service';
import { Sweetalert2Service } from './sweetalert2.service';

@Injectable({
  providedIn: 'root'
})
export class FinalizarSessionService {

    private sessionTimeout: any = null;

    constructor(
        private _inicioSesion : InicioSesionService,
        private _router : Router,
        private _sweetAlertService : Sweetalert2Service
    ) {

      }

      public startSessionTimer() {
          this.resetSessionTimer()
          this.sessionTimeout = setInterval(() => {
          this.resetSessionTimer()
          this.logout();
        }, 10000);
        // 900000
      }

      resetSessionTimer() {
        clearInterval(this.sessionTimeout);
        this.sessionTimeout = null
      }

      logout() {
        this._inicioSesion.eliminarUsuario();
        this._router.navigate(['/login/sign-in']);
        this._sweetAlertService.alertInfo({ info : 'Su sesión ha expirado, por favor inicie sesión nuevamente.' })

      }
}
