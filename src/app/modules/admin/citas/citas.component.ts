import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SharedModuleModule } from 'app/shared/module/shared-module.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ModalCitasComponent } from './modal-citas/modal-citas.component';
import { UtilityService } from 'app/core/services/utility.service';
import { EntidadService } from 'app/core/services/entidad.service';
import { Sweetalert2Service } from 'app/core/services/sweetalert2.service';
import moment from 'moment';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss'],
  standalone:true,
  imports: [SharedModuleModule]
})
export class CitasComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild(MatPaginator) paginador : MatPaginator

    public displayedColumns = [ 'fechaRegistro', 'estado', 'nombreAgenda', 'tipoAgenda', 'fechaAgenda']
    public dataSource =  new MatTableDataSource([])
    public hoy = new Date();
    public user = null


    ngOnInit(): void {

        const user = sessionStorage.getItem('userToken')
        const userParse = JSON.parse(user)
        this.user = userParse
        if(this.user.tipoUsuario === 'USER'){
            this.displayedColumns = ['editar', 'fechaRegistro', 'estado', 'nombreAgenda', 'tipoAgenda', 'fechaAgenda']
        }

    }


    ngAfterViewInit(): void {

    }


    ngOnDestroy(): void {

    }


    constructor(
        private _modalService: MatDialog,
        private utilService: UtilityService,
        private _entidadService: EntidadService,
        private _sweetAlertService: Sweetalert2Service
    ){}


    public listarCitas(): void {

         const fecha = moment(this.hoy).format("YYYY-MM-DD")

        this._entidadService.listarCitas(fecha).subscribe({
            next:(resp)=>{

                this.dataSource = new  MatTableDataSource(resp.data)
                this.dataSource.paginator = this.paginador


            },
            error:(e)=>{
                 this.dataSource = new  MatTableDataSource([])
                this.dataSource.paginator = this.paginador
                this._sweetAlertService.alertInfo({})
            }
        })

    }

    public filtrar(text): void {
        this.dataSource.filter = text


    }


    public descargarData(): void {

            const data = this.dataSource.data
            this.utilService.exportAsExcelFile(data,'Citas_registradas')

        }


    public enviarSolicitud(cita): void {


        const callback=()=>{

             this._entidadService.agendarrCitas(cita.idCita).subscribe({
            next:(resp)=>{
                this.dataSource = new  MatTableDataSource([])
                this.dataSource.paginator = this.paginador
                this._sweetAlertService.alertSuccess()

            },
            error:(e)=>{
                this._sweetAlertService.alertError(e)
            }
        })


        }
        this._sweetAlertService.alertConfirmation(callback)




    }




      public crearCita(): void {

                this._modalService.open(ModalCitasComponent, {
                    width:'700px',
                    maxWidth: '90vw',
                }).afterClosed().subscribe((resp)=>{

                    if(!resp){
                        return
                    }

                    this.listarCitas()

                })





            }

}
