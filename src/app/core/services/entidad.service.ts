import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettingsService } from '../app-config/app-settings.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntidadService {

  constructor(
    private _httpClient : HttpClient,
    private _appSetting : AppSettingsService
  ) { }


  public crearEntidad(entidad): Observable<any>{

      return this._httpClient.post(this._appSetting.entidad.registarEntidad, entidad)
    }

      public actualizarEntidad(entidad): Observable<any>{

      return this._httpClient.put(this._appSetting.entidad.actualizarEntidad, entidad)
    }




    public listarEntidad(): Observable<any>{

      return this._httpClient.get(this._appSetting.entidad.listarEntidad)
    }



    public guardarAgenda(agenda): Observable<any>{

      return this._httpClient.post(this._appSetting.agenda.guardarAgenda, agenda)
    }


    public listarAgenda(fecha): Observable<any>{
        const params = {fecha}
      return this._httpClient.get(this._appSetting.agenda.listarAgenda, {params})
    }



      public listarCitas(fecha): Observable<any>{
        const params = {fecha}
      return this._httpClient.get(this._appSetting.citas.listarCitas, {params})
    }


         public crearCitas(data): Observable<any>{

      return this._httpClient.post(this._appSetting.citas.crearCitas, data)
    }


        public agendarrCitas(idCita): Observable<any>{
            const params = {idCita}
      return this._httpClient.get(this._appSetting.citas.agendarCita, {params})
    }



            public crearUsuario(usuario): Observable<any>{

      return this._httpClient.post(this._appSetting.usuario.crearUsuario, usuario)
    }







}
