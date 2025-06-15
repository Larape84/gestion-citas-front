import { Injectable } from '@angular/core';
import { EndPoints } from './end-point';




@Injectable({
    providedIn: 'root',
  })

export class AppSettingsService {


    public iniciarSesion = {
        base : EndPoints.uri('usuario/login'),
    }

    public entidad = {
        base : EndPoints.uri('entidades/registrar-entidad'),
    }









}


