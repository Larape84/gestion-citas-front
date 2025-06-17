import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EntidadService } from 'app/core/services/entidad.service';
import { ErrorService } from 'app/core/services/error.service';
import { Sweetalert2Service } from 'app/core/services/sweetalert2.service';
import { SharedModuleModule } from 'app/shared/module/shared-module.module';

@Component({
  selector: 'app-modal-agendas',
  templateUrl: './modal-agendas.component.html',
  styleUrls: ['./modal-agendas.component.scss'],
  imports:[SharedModuleModule],
  standalone:true,
})
export class ModalAgendasComponent {


    public formAgenda : FormGroup = new FormGroup({})
    public entidades = []


        constructor(
            @Inject(MAT_DIALOG_DATA) public data,
            private fb: FormBuilder,
            private _modalRef : MatDialogRef<ModalAgendasComponent>,
            private sweetAlertService: Sweetalert2Service,
            private _entidadService: EntidadService,
            public errorService : ErrorService,

        ){}


        ngOnInit(): void {

            const data = this.data

            this.formAgenda = this.fb.group({
                idAgenda: [],
                nombreAgenda: [ '' ,[Validators.required]],
                entidad: [ data || '' ,[Validators.required]],
                tipoAgenda: [  '' ,[Validators.required]],
                fechaAgenda: ['' ,[Validators.required]],


            })

            if(!!data){
                this.entidades = [data]
                 this.formAgenda.controls['entidad'].disable()
                  this.formAgenda.controls['entidad'].updateValueAndValidity()
            }

        }




        public guardar(): void {

            const callback = ()=>{

                const form = this.formAgenda.getRawValue()


                const payload = {
                    ...form
                }

                this._entidadService.guardarAgenda(payload).subscribe({
                    next:(resp)=>{
                        this.sweetAlertService.alertSuccess().then(()=>{
                             this._modalRef.close(true)
                        })
                    },
                    error:(e)=>{
                        this.sweetAlertService.alertInfo({})
                    }
                })







            }

            this.sweetAlertService.alertConfirmation(callback)





        }


        public cerrar(): void {
            this._modalRef.close(null)

        }





}
