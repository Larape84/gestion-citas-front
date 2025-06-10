import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { SharedModuleModule } from 'app/shared/module/shared-module.module';
import { MatDrawer } from '@angular/material/sidenav';
import { Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InicioSesionService } from 'app/modules/auth/sign-in/inicio-sesion.service';
import { Sweetalert2Service } from 'app/core/services/sweetalert2.service';
import { UserServicesService } from 'app/core/services/user-services.service';
import { ErrorService } from 'app/core/services/error.service';
import { ValidatorPasswordMatch } from 'app/shared/Validators/input.Validator';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
  standalone:true,
  imports:[SharedModuleModule,]
})
export class UsuarioComponent implements OnDestroy, AfterViewInit {

    @ViewChild('drawer') drawer: MatDrawer;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    panels: any[] = [];
    selectedPanel: string = 'account';
    accountForm : FormGroup
    public user = null
    public fomrPassword :FormGroup
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private fb: FormBuilder,
         private _sweetAlertService: Sweetalert2Service,
         public errorService: ErrorService
    )
    {}


    ngAfterViewInit(): void {


    }

    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    public initFomrPass(): void {
        this.fomrPassword = this.fb.group({
            pass:['',[Validators.required]],
            newPass:['',[Validators.required, Validators.minLength(4)]],
            repeatPass:['',[Validators.required]]
        },{ validator: ValidatorPasswordMatch('newPass', 'repeatPass')} )
    }

    ngOnInit(): void
    {
        this.initUser();
        this.initFomrPass();
        // Setup available panels
        this.panels = [
            {
                id         : 'account',
                icon       : 'heroicons_outline:user-circle',
                title      : 'Mi perfil',
                description: 'Administra la información básica de tu perfil.'
            },
            {
                id         : 'security',
                icon       : 'heroicons_outline:lock-closed',
                title      : 'Seguridad',
                description: 'Administra la seguridad de tu perfil.'
            },
        ];


        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) => {

                // Set the drawerMode and drawerOpened
                if ( matchingAliases.includes('lg') )
                {
                    this.drawerMode = 'side';
                    this.drawerOpened = true;
                }
                else
                {
                    this.drawerMode = 'over';
                    this.drawerOpened = false;
                }

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    goToPanel(panel: string): void
    {
        this.selectedPanel = panel;

        // Close the drawer on 'over' mode
        if ( this.drawerMode === 'over' )
        {
            this.drawer.close();
        }
    }

    /**
     * Get the details of the panel
     *
     * @param id
     */
    getPanelInfo(id: string): any
    {
        return this.panels.find(panel => panel.id === id);
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }




    public initUser(): void {
    //    this.user =  this._inicioSesionService.obtenerUsuario()

    //    const values = ['email','fullName','phone','username','identification']

       this.accountForm = this.fb.group({
        nombres:[`${this.user.nombre} ${this.user.apellido}`,[]],
        profile:[this.user.cargo,[Validators.required]],
        identification:[this.user.cedula,[Validators.required]],
        centro:[this.user.centroCosto,[Validators.required]]
       })



       const disabled = ['nombres', 'identification']

       disabled.forEach((control)=>{
        this.accountForm.controls[control].disable()
        this.accountForm.controls[control].updateValueAndValidity()
       })

    }

    actualizarDatos(): void {
        this._sweetAlertService.startLoading({})
        const {id} = this.user
        const payload = this.accountForm.value















    }

    public actualizarContrasena(): void {

        const data = this.fomrPassword.value

        if(String(this.user.contrasena)!==String(data.pass)){
            this._sweetAlertService.alertInfo({ info : 'Su contraseña actual no coincide, por favor validar'})
            return
        }

         this.user['contrasena'] = String(data.pass)
         this.user['apellido'] = String(data.pass)

         const updatedData: any = { contrasena: String(data.newPass) };

        this._sweetAlertService.startLoading({})










    }

    public regresarControl(form: FormGroup, control:string): FormControl {
        return form.controls[control] as FormControl
    }

    }




