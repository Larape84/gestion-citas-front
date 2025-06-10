import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettingsService } from '../app-config/app-settings.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  constructor(
    private _httpClient: HttpClient,
    private _appSettings: AppSettingsService
  ) { }


  public crearUsuario(usuario: any): Observable<any>{
    return this._httpClient.post(this._appSettings.Usuario.base, {...usuario})
  }


  public listarUsuario(): Observable<any>{
    return this._httpClient.get(this._appSettings.Usuario.base)
  }


























}
