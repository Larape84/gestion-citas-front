import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Navigation } from 'app/core/navigation/navigation.types';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { AppSettingsService } from '../app-config/app-settings.service';
import { InicioSesionService } from 'app/modules/auth/sign-in/inicio-sesion.service';

@Injectable({providedIn: 'root'})
export class NavigationService
{
    private _navigation: ReplaySubject<Navigation | any> = new ReplaySubject<Navigation>(1);

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _authService : AuthService,
        private _appSettings: AppSettingsService,
        private _inicioSesion: InicioSesionService

    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for navigation
     */
    get navigation$(): Observable<Navigation>
    {
        return this._navigation.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all navigation data
     */
    get(): Observable<any>
    {


        return this._httpClient.get<Navigation | any>('api/common/navigation').pipe(
            tap((navigation) => {
                console.log(navigation, 'navigacion')

                const user = sessionStorage.getItem('userToken')
                const parser = JSON.parse(user)

                const roles = {
                    ADMIN : [1,2,3,4],
                    USER : [4],
                    ENTIDAD : [1,2,3,4]
                }

                const modules = []

                navigation.compact.forEach((item)=>{

                    if(  roles[parser.tipoUsuario].includes(item.access) ){
                        modules.push(item)

                    }

                })

                const navegacionCompleta = {
                    compact:modules,
                    default:modules,
                    futuristic:modules,
                    horizontal:modules
                }
                // this._navigation.next(navigation);
                this._navigation.next(navegacionCompleta);


            })
        );
    }


}
