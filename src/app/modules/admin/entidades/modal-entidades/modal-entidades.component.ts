import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModuleModule } from 'app/shared/module/shared-module.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Sweetalert2Service } from 'app/core/services/sweetalert2.service';
import { EntidadService } from 'app/core/services/entidad.service';
import { ErrorService } from 'app/core/services/error.service';

@Component({
  selector: 'app-modal-entidades',
  templateUrl: './modal-entidades.component.html',
  styleUrls: ['./modal-entidades.component.scss'],
  imports:[SharedModuleModule],
  standalone:true
})
export class ModalEntidadesComponent implements OnInit {

    public formEntidad : FormGroup = new FormGroup({})



    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        private fb: FormBuilder,
        private _modalRef : MatDialogRef<ModalEntidadesComponent>,
        private sweetAlertService: Sweetalert2Service,
        private _entidadService: EntidadService,
        public errorService : ErrorService,

    ){}


    ngOnInit(): void {

        const data = this.data || null

        this.formEntidad = this.fb.group({
            idEntidad: [data?.idEntidad || 0],
            nitEntidad: [data?.nitEntidad || '' ,[Validators.required]],
            nombre: [data?.nombre || '' ,[Validators.required]],
            direccion: [data?.direccion || '' ,[Validators.required]],
            telefono: [data?.telefono ||'' ,[Validators.required]],
            tipo: [data?.tipo || '' ,[Validators.required]],

        })

    }

    public guardar(): void {

        const callback = ()=>{

            const form = this.formEntidad.getRawValue()


            const payload = {
                ...form
            }

            this._entidadService.crearEntidad(payload).subscribe({
                next:(resp)=>{
                    this.sweetAlertService.alertSuccess().then(()=>{
                         this._modalRef.close()
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
        this._modalRef.close()

    }









}
