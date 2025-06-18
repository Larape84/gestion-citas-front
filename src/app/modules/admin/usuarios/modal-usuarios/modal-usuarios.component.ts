import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EntidadService } from 'app/core/services/entidad.service';
import { ErrorService } from 'app/core/services/error.service';
import { Sweetalert2Service } from 'app/core/services/sweetalert2.service';
import { SharedModuleModule } from 'app/shared/module/shared-module.module';

@Component({
  selector: 'app-modal-usuarios',
  templateUrl: './modal-usuarios.component.html',
  styleUrls: ['./modal-usuarios.component.scss'],
  imports:[SharedModuleModule],
  standalone:true
})
export class ModalUsuariosComponent {


     public formUsuario : FormGroup = new FormGroup({})



        constructor(
            @Inject(MAT_DIALOG_DATA) public data,
            private fb: FormBuilder,
            private _modalRef : MatDialogRef<ModalUsuariosComponent>,
            private sweetAlertService: Sweetalert2Service,
            private _entidadService: EntidadService,
            public errorService : ErrorService,

        ){}


        ngOnInit(): void {

            const data = this.data || null

            this.formUsuario = this.fb.group({
                idUsuario: [0],
                nombre: ['' ,[Validators.required]],
                tipoDocumento: [ '' ,[Validators.required]],
                numDocumento: [ '' ,[Validators.required]],
                email: ['' ,[Validators.required]],
                password: [ '' ,[Validators.required]],
                telefono: [ '' ,[Validators.required]],
                tipoUsuario: [ '' ,[Validators.required]],
                fechaRegistro: ['' ,[]],
            })

        }




        public guardar(): void {

            const callback = ()=>{

                const form = this.formUsuario.getRawValue()


                const payload = {
                    ...form
                }

                this._entidadService.crearUsuario(payload).subscribe({
                    next:(resp)=>{
                        this.sweetAlertService.alertSuccess().then(()=>{
                             this._modalRef.close(true)
                        })
                    },
                    error:(e)=>{
                        this.sweetAlertService.alertError(e)
                    }
                })







            }

            this.sweetAlertService.alertConfirmation(callback)





        }


        public cerrar(): void {
            this._modalRef.close(null)

        }

}
