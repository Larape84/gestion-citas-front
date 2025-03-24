import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { BehaviorSubject, catchError, Observable, of, skip, Subject, switchMap, tap, throwError } from 'rxjs';
import { AppSettingsService } from '../app-config/app-settings.service';
import { Router } from '@angular/router';
import { InicioSesionService } from 'app/modules/auth/sign-in/inicio-sesion.service';
import Swal from 'sweetalert2';

@Injectable({providedIn: 'root'})


export class AuthService{

    public _modules$ =new BehaviorSubject<[]>([])
    private _authenticated: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService,
        private _appSettings: AppSettingsService,
        private _router : Router,
        private _inicioSesion: InicioSesionService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------



    /**
     * Setter & getter for access token
     */
    set accessToken(token: string)
    {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string
    {
        return localStorage.getItem('accessToken') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any>
    {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any>
    {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { username: string; password: string }): Observable<any>
    {
        return this._httpClient.post(this._appSettings.singIn.base, credentials);
    }


    public esperarToken():Promise<void> {

        return new Promise ((resolve)=>{

            try {
                const userBase64 =  sessionStorage.getItem(btoa('userToken'))
                const userLogin = JSON.parse(atob(userBase64))
                if(!!userLogin){
                    resolve()
                }else{
                this._inicioSesion.eliminarUsuario()
                this._router.navigateByUrl('/login/sign-in')
                resolve()
                }

            } catch (error) {
                this._inicioSesion.eliminarUsuario()
                this._router.navigateByUrl('/login/sign-in')
                resolve()
            }



            // this._httpClient.post(this._appSettings.singIn.refreshToken,payload).subscribe({
            //     next:(resp:any)=>{
            //         const {data} = resp
            //         this._inicioSesion.asignarUsuarioModulos(data.user, data.permissions)
            //         resolve()
            //     },error:()=>{
            //         this._inicioSesion.eliminarUsuario()
            //         this._router.navigate(['/sign-in']);
            //         resolve()
            //     }
            // })
        })


    }

    public consultarToken():Observable<boolean> {


        if (!localStorage.getItem('accessToken')){
            localStorage.removeItem('accessToken')
            this._router.navigate(['/sign-out']);
            return of(false)
        }
        const payload = {
            token: localStorage.getItem('accessToken')
        }
        this._httpClient.post(this._appSettings.singIn.refreshToken,payload).subscribe((resp: any)=>{
            const {data} = resp
            this._inicioSesion.asignarUsuarioModulos(data.user)
            return of(true)
        },(e)=>{

            localStorage.removeItem('accessToken')
            this._router.navigate(['/sign-out']);
            return of(false)
        })

    }






    /**
     * Sign in using the access token
     */
    // signInUsingToken(): Observable<any>
    // {
    //     // Sign in using the token
    //     return this._httpClient.post(this._appSettings.singIn.base, {
    //         accessToken: this.accessToken,
    //     }).pipe(
    //         catchError(() =>

    //             // Return false
    //             of(false),
    //         ),
    //         switchMap((response: any) =>
    //         {
    //             // Replace the access token with the new one if it's available on
    //             // the response object.
    //             //
    //             // This is an added optional step for better security. Once you sign
    //             // in using the token, you should generate a new one on the server
    //             // side and attach it to the response object. Then the following
    //             // piece of code can replace the token with the refreshed one.
    //             if ( response.accessToken )
    //             {
    //                 this.accessToken = response.token;
    //             }

    //             // Set the authenticated flag to true
    //             this._authenticated = true;

    //             // Store the user on the user service
    //             this._userService.user = response.user;

    //             // Return true
    //             return of(true);
    //         }),
    //     );
    // }

    /**
     * Sign out
     */
    signOut(): Observable<any>
    {



        this._authenticated = false;

        this._inicioSesion.eliminarUsuario();

        Swal.fire({
            allowOutsideClick: false,
            title: 'Error',
            text: "Por favor iniciar sesión",
            icon: 'error',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            customClass: {
              actions: 'flex-row-reverse gap-2',
              confirmButton: 'rounded-full w-26 ring-0'
            }
          }).then(() => {
              this._router.navigateByUrl('sign-in');
          })


        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { name: string; email: string; password: string; company: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean>
    {
        // Check if the user is logged in
        if ( this._authenticated )
        {
            return of(true);
        }

        // Check the access token availability
        if ( !this.accessToken )
        {
            return of(false);
        }

        // Check the access token expire date
        if ( AuthUtils.isTokenExpired(this.accessToken) )
        {
            return of(false);
        }

        // If the access token exists, and it didn't expire, sign in using it

    }
}
