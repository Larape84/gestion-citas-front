import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { InicioSesionService } from './modules/auth/sign-in/inicio-sesion.service';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss'],
    standalone : true,
    imports    : [RouterOutlet],
})
export class AppComponent
{
    /**
     * Constructor
     */
    constructor(
        private _router: Router,
        private _inicioSesion: InicioSesionService

    )
    {

    }
}
