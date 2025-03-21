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

  public listarPerfiles(): Observable<any>{
    return this._httpClient.get(this._appSettings.Perfiles.listarPerfiles)
  }

  public listarDependencias(): Observable<any>{
    return this._httpClient.get(this._appSettings.Dependencias.base)
  }

  public listarDependenciasActivas(): Observable<any>{
    return this._httpClient.get(this._appSettings.Dependencias.dependenciasActicas)
  }

  public actualizarEstadoUsuario(usuario, estado : any): Observable<any>{

    return this._httpClient.patch(`${this._appSettings.Usuario.actualizarEstado}/${usuario}`, estado)
  }

  public actualizarDatosUsuario(usuario, datos : any): Observable<any>{

    return this._httpClient.patch(`${this._appSettings.Usuario.actualizarDatos}/${usuario}`, datos)
  }

  public crearDependencia(datos : any): Observable<any>{

    return this._httpClient.post(`${this._appSettings.Dependencias.base}`, datos)
  }

  public actualizarDependencia(dependencia, datos : any): Observable<any>{

    return this._httpClient.patch(`${this._appSettings.Dependencias.base}/${dependencia}`, datos)
  }

  public cambiarEstadoDependencia(dependencia, datos : any): Observable<any>{

    return this._httpClient.patch(`${this._appSettings.Dependencias.base}/${dependencia}`, datos)
  }

  public actualizarContrasena(usuario, datos : any): Observable<any>{

    return this._httpClient.patch(`${this._appSettings.Usuario.actualizarPassword}/${usuario}`, datos)
  }

  public restablecerContrasena(datos : any): Observable<any>{

    return this._httpClient.post(`${this._appSettings.Usuario.restableceContrasena}`, {...datos})
  }

  public listarRemitentes(): Observable<any>{
    return this._httpClient.get(this._appSettings.Remitentes.base)
  }

  public crearRemitentes(data: any): Observable<any>{
    return this._httpClient.post(this._appSettings.Remitentes.base, data)
  }

  public actualizarRemitentes(remitente: string, data: any): Observable<any>{
    return this._httpClient.patch(`${this._appSettings.Remitentes.base}/${remitente}`, data)
  }


  public selectTipoDocumento():Observable<any>{
    return this._httpClient.get(`${this._appSettings.Remitentes.tipoDocumento}`)
  }

  public selectTipoRemitente():Observable<any>{
    return this._httpClient.get(`${this._appSettings.Remitentes.tipoRemitente}`)
  }


  public selectSerie():Observable<any>{
    return this._httpClient.get(`${this._appSettings.correspondenciaRecibida.selectSerie}`)
  }


  public selectSubserie():Observable<any>{
    return this._httpClient.get(`${this._appSettings.correspondenciaRecibida.selectSubSerie}`)
  }

  public selectusuariosActivosporDependencia(dependencia: string):Observable<any>{
    return this._httpClient.get(`${this._appSettings.Usuario.usuariosActivosPorDependencia}/${dependencia}`)
  }

  public selectusuariosActivos():Observable<any>{
    return this._httpClient.get(`${this._appSettings.Usuario.usuariosActivos}`)
  }

  public selectRemitenteActivo():Observable<any>{
    return this._httpClient.get(`${this._appSettings.Remitentes.selectRemitenteActivo}`)
  }

  public listarCorrespondenciaRecibida():Observable<any>{
    return this._httpClient.get(`${this._appSettings.correspondenciaRecibida.base}`)
  }


}
