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

      return this._httpClient.post(this._appSetting.entidad.base, entidad)
    }








}
