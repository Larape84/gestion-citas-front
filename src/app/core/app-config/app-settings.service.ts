import { Injectable } from '@angular/core';
import { EndPoints } from './end-point';




@Injectable({
    providedIn: 'root',
  })

export class AppSettingsService {


    public iniciarSesion = {
        base : EndPoints.uri('usuarios/login'),
    }

    public entidad = {
        registarEntidad : EndPoints.uri('entidades/registrar-entidad'),
        listarEntidad :EndPoints.uri('entidades/listar-entidad'),
        actualizarEntidad : EndPoints.uri('entidades/actualizar-entidad'),


    }

    public agenda = {
        guardarAgenda : EndPoints.uri('agenda/crear-agenda'),
        listarAgenda: EndPoints.uri('agenda/listar-agenda'),


    }



      public citas = {
        listarCitas : EndPoints.uri('cita/listar-citas-fecha'),
        crearCitas: EndPoints.uri('cita/registra-cita'),
        agendarCita : EndPoints.uri('cita/agendar-cita-usuario')


    }

         public usuario = {
        crearUsuario : EndPoints.uri('usuarios/registrar-usuario'),


    }









}


