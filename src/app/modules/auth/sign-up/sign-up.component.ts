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
import { FirebaseService } from 'app/core/services/services-firebase.service';
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
    public cargos = [
'Aseador(a) G10',
'Instructor G20',
'Conductor G10',
'Tecnico G02',
'Secretaria G02',
'Trabajador de Campo G10',
'Profesional G02',
'Profesional G04',
'Auxiliar G01',
'Profesional G01',
'Oficial Mantto Gral.G10',
'Profesional G06',
'Instructor G18',
'Instructor G19',
'Operario Mtto Gral.G10',
'Instructor G12',
'Profesional G08',
'Instructor G17',
'Instructor G11',
'Instructor G13',
'Instructor G14',
'Instructor G10',
'Profesional G03',
'Subdirector de Centro G02',
'Instructor G16',
'Instructor G15',
'Secretaria G03',
'Profesional G09',
'Aprendiz Sena',
'Aseador(a) G04',
'Instructor G09',
'Instructor G07',
'Oficinista G02',
'Profesional G10',
'Tecnico G03',
'Tecnico G01',
'Auxiliar G02'
    ]

    public centros = [
        'CENTRO INDUSTRIAL Y DE AVIACION',
        'CENTRO NACIONAL COLOMBO ALEMAN',
    ]

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _fireService : FirebaseService,
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
        console.log(valid)
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


        const existeUsuario = await this.validarUsuarioRegistrado() || false;

        console.log(existeUsuario, 'existeUsuario leoleoleo')

        if(existeUsuario){
            this._sweetalertService.alertInfo({info:'El usuario ya se encuentra registrado, por favor iniciar sesión'})
            this._route.navigateByUrl('/login/sign-in')
            return
        }

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

                                console.log(usuario, 'usuerio a enviar')
        this._fireService.createDocumentWithId('usuarios', String(usuario.cedula), usuario).subscribe({
            next:(resp)=>{
                console.log(resp)
                this._sweetalertService.alertSuccess()
                this._route.navigateByUrl('/login/sign-in')

                this.initForm()


            },
            error:(e)=>{
                console.log(e)
            }
        })


    }


    public validarUsuarioRegistrado(): Promise<boolean>{
        return new Promise((resolve)=>{
            const usuario = this.signUpForm.value
            this._fireService.getDocumentId('usuarios', usuario.cedula).subscribe({
                next:(res)=>{
                    console.log(res, 'resresres')
                    if(!!res){
                        resolve(true)
                    }else{
                        resolve(false)
                    }
                },
                error:()=>{
                    resolve(false)
                }
            })



        })
    }
}
