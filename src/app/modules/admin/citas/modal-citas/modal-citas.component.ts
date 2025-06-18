import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EntidadService } from 'app/core/services/entidad.service';
import { ErrorService } from 'app/core/services/error.service';
import { Sweetalert2Service } from 'app/core/services/sweetalert2.service';
import { SharedModuleModule } from 'app/shared/module/shared-module.module';
import { ModalEntidadesComponent } from '../../entidades/modal-entidades/modal-entidades.component';

@Component({
  selector: 'app-modal-citas',
  templateUrl: './modal-citas.component.html',
  styleUrls: ['./modal-citas.component.scss'],
  imports : [SharedModuleModule],
  standalone: true
})
export class ModalCitasComponent {

public formCitas : FormGroup = new FormGroup({})
public agendas  = []



    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        private fb: FormBuilder,
        private _modalRef : MatDialogRef<ModalCitasComponent>,
        private sweetAlertService: Sweetalert2Service,
        private _entidadService: EntidadService,
        public errorService : ErrorService,

    ){}


    ngOnInit(): void {

        const data = this.data || null
        console.log(data)

        this.formCitas = this.fb.group({
            idCita: [0],
            agenda: [data ,[Validators.required]],
            hora: ['' ,[Validators.required]],
            fechaRegistro: [ this.data.fechaAgenda ,[Validators.required]],


        })

        this.agendas.push(this.data)

        this.formCitas.controls['agenda'].disable()
        this.formCitas.controls['agenda'].updateValueAndValidity()

        this.formCitas.controls['fechaRegistro'].disable()
        this.formCitas.controls['fechaRegistro'].updateValueAndValidity()



    }




    public guardar(): void {

        const callback = ()=>{

            const form = this.formCitas.getRawValue()


            const payload = {
                ...form,
                hora : `${form.hora}:00`
            }

            this._entidadService.crearCitas(payload).subscribe({
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
