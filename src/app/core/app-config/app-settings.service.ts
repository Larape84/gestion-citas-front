import { Injectable } from '@angular/core';
import { EndPoints } from './end-point';




@Injectable({
    providedIn: 'root',
  })

export class AppSettingsService {


    public singIn = {
        base : EndPoints.uri('api/auth/user/'),
        refreshToken: EndPoints.uri('api/auth/user/refresh-token')
    }

    public Usuario = {
        base : EndPoints.uri('api/user'),
        actualizarEstado: EndPoints.uri('api/user/status'),
        actualizarDatos: EndPoints.uri('api/user'),
        actualizarPassword: EndPoints.uri('api/user/update-password'),
        restableceContrasena: EndPoints.uri('api/auth/user/forgot-password'),
        usuariosActivosPorDependencia:EndPoints.uri('api/user/dependency'),
        usuariosActivos:EndPoints.uri('api/user/enabled'),

    }

    public Perfiles = {
        listarPerfiles : EndPoints.uri('api/select/profile')
    }

    public Dependencias = {
        base : EndPoints.uri('api/dependency'),
        dependenciasActicas : EndPoints.uri('api/dependency/enabled')

    }


    public Remitentes = {
        base: EndPoints.uri('api/sender'),
        tipoDocumento: EndPoints.uri('api/select/documet-type'),
        tipoRemitente: EndPoints.uri('api/select/applicant-type'),
        selectRemitenteActivo: EndPoints.uri('api/sender/enabled'),

    }

    public correspondenciaRecibida = {
        selectSerie:EndPoints.uri('api/select/serie'),
        selectSubSerie:EndPoints.uri('api/select/sub-serie'),
        base: EndPoints.uri('api/correspondence-sent')
    }


}


