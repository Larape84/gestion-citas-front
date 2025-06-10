import { ErrorService } from './../../../core/services/error.service';
import { NgFor, NgIf } from '@angular/common';
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
import { AuthService } from 'app/core/auth/auth.service';
import { Sweetalert2Service } from 'app/core/services/sweetalert2.service';
import { ValidarSoloLetrasConEspacio } from 'app/shared/Validators/input.Validator';
import { NgxMaskDirective } from 'ngx-mask';
import { InicioSesionService } from '../sign-in/inicio-sesion.service';
import { MatSelectModule } from '@angular/material/select';
import { DateTime } from 'luxon';

@Component({
    selector     : 'auth-sign-up',
    templateUrl  : './sign-up.component.html',
    styleUrls : ['./sign-un.component.style.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations,
    standalone   : true,
    imports      : [NgxMaskDirective, MatSelectModule, RouterLink, NgIf, NgFor, FuseAlertComponent, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule],
})
export class AuthSignUpComponent implements OnInit
{
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: '',
    };
    signUpForm: UntypedFormGroup;
    showAlert: boolean = false;



    /**
     * Constructor
     */
    constructor(
        private _formBuilder: UntypedFormBuilder,
        public errorService : ErrorService,
        private _sweetalertService :Sweetalert2Service,
        private _inicioSesion : InicioSesionService,
        private _route : Router
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
        this.initForm()
        this._inicioSesion.eliminarUsuario()
    }


    public initForm(): void {
        this.signUpForm = this._formBuilder.group({
            cedula:['',[Validators.required]],
            nombre:['',[Validators.required, ValidarSoloLetrasConEspacio()]],
            apellido:['',[Validators.required, ValidarSoloLetrasConEspacio()]],
            cargo:['',[Validators.required]],
            centroCosto:['',[Validators.required]],
            contrasena:['',[Validators.required, Validators.minLength(4)]],
            terminosCondiciones:[false,[Validators.required, Validators.requiredTrue]],
            activo: [false,[]]
           },
       );
    }

    public valdarForm(): Promise<boolean>{

        return new Promise ((resolve)=>{

            setTimeout(() => {

                if(this.signUpForm.invalid){
                    this.signUpForm.markAllAsTouched()
                    resolve(true)
                }else{
                    resolve(false)
                }
            }, 200);

        })
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign up
     */
    async signUp(): Promise<void>
    {


        this.signUpForm.markAsUntouched()
        this.signUpForm.updateValueAndValidity()

        const valid = await this.valdarForm()
        if(valid){
            return
        }


        this._sweetalertService.startLoading({})


        this.showAlert = false;
        const usuario = this.signUpForm.value

        usuario['nombre']= usuario['nombre'].toUpperCase()
        usuario['apellido']= usuario['apellido'].toUpperCase()
        usuario['fechaRegistro'] = DateTime.local().toFormat('dd-MM-yyyy');
        usuario['horaRegistro'] = DateTime.local().toFormat('HH:mm:ss');







        usuario['permisos'] = [
                                    {
                                        "id": 1,
                                        "title": "Usuarios",
                                        "type": "basic",
                                        "icon": "heroicons_outline:user",
                                        "link": "/usuarios",
                                        "access": {
                                            "admin": false,
                                            "gestor":false,
                                            "usuario": true
                                        }
                                    },

                                ]




    }



}
