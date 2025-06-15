import { NgIf } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { InicioSesionService } from './inicio-sesion.service';
import { ErrorService } from 'app/core/services/error.service';
import { NgxMaskDirective } from 'ngx-mask';
import { Sweetalert2Service } from 'app/core/services/sweetalert2.service';
import { FinalizarSessionService } from 'app/core/services/finalizar-session.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector     : 'auth-sign-in',
    templateUrl  : './sign-in.component.html',
    styleUrls :['./sign-in.component.style.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations,
    standalone   : true,
    imports      : [NgxMaskDirective, RouterLink, FuseAlertComponent, NgIf, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule],
})
export class AuthSignInComponent implements OnInit
{
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: '',
    };
    signInForm: UntypedFormGroup;
    showAlert: boolean = false;


    /**
     * Constructor
     */
    constructor(

        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private _inicioSesion: InicioSesionService,
        public errorService : ErrorService,
        private _sweetAlertService : Sweetalert2Service,
        private _finalizaSecion : FinalizarSessionService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form
        this.signInForm = this._formBuilder.group({
            username     : ['jmsalazar1995@gmail.com', [Validators.required,]],
            password  : ['jm95140812', Validators.required],

        });

        // localStorage.removeItem('accessToken')
        this._inicioSesion.eliminarUsuario()
        this._finalizaSecion.resetSessionTimer()
        // sessionStorage.clear();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    public errorForm(): void {
        this.signInForm.enable();
        this.signInNgForm.resetForm();
        this.alert = {
            type   : 'error',
            message: 'Error, usuario o contraseña incorrecto',
        };
        this.showAlert = true;
    }

    public valdarForm(): Promise<boolean>{

        return new Promise ((resolve)=>{

            setTimeout(() => {

                if(this.signInForm.invalid){
                    this.signInForm.markAllAsTouched()
                    resolve(true)
                }else{
                    resolve(false)
                }
            }, 200);

        })
    }

    /**
     * Sign in
     */
    async signIn(): Promise<void>
    {




        this.signInForm.markAsUntouched()
        this.signInForm.updateValueAndValidity()

        this.showAlert = false
        const valid = await this.valdarForm()




        if(valid){
            return
        }

        const userLogin = {
            email: this.signInForm.controls['username'].value,
            password: this.signInForm.controls['password'].value
            }

        this._sweetAlertService.startLoading({})

        this._inicioSesion.iniciarSesion(userLogin).subscribe({
            next:(res)=>{

                this._sweetAlertService.stopLoading()

                this._inicioSesion.asignarUsuarioModulos(res.data)
                this._router.navigateByUrl('/app')

            },
            error:(e: HttpErrorResponse)=>{

                this._sweetAlertService.alertError(e)
            }
        })





    }
}
