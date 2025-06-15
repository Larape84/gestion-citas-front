import { filter, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppSettingsService } from 'app/core/app-config/app-settings.service';

@Injectable({
  providedIn: 'root'
})
export class InicioSesionService {

  constructor(
    private _router : Router,
    private _http : HttpClient,
    private _appSetting : AppSettingsService
  ) { }


  public asignarUsuarioModulos(usuario: any):void {
    const usuarioBtao = JSON.stringify(usuario)
    sessionStorage.setItem('userToken',usuarioBtao)
  }



  public eliminarUsuario(): void {
   sessionStorage.removeItem(btoa('userModules'))
   sessionStorage.removeItem(btoa('userToken'))
   localStorage.removeItem('accessToken')
  }


  public iniciarSesion(user): Observable<any>{

    return this._http.post(this._appSetting.iniciarSesion.base, user)
  }






















}
