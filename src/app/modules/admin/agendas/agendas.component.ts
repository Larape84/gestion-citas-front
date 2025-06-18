import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SharedModuleModule } from 'app/shared/module/shared-module.module';
import { ModalAgendasComponent } from './modal-agendas/modal-agendas.component';
import { EntidadService } from 'app/core/services/entidad.service';
import moment from 'moment';
import { Sweetalert2Service } from '../../../core/services/sweetalert2.service';
import { FormsModule } from '@angular/forms';
import { UtilityService } from 'app/core/services/utility.service';
import { ModalCitasComponent } from '../citas/modal-citas/modal-citas.component';

@Component({
  selector: 'app-agendas',
  templateUrl: './agendas.component.html',
  styleUrls: ['./agendas.component.scss'],
  standalone:true,
  imports: [SharedModuleModule, FormsModule]
})
export class AgendasComponent implements OnInit, AfterViewInit, OnDestroy {

      @ViewChild(MatPaginator) paginador : MatPaginator

        public displayedColumns = [ 'editar','nombreAgenda', 'tipoAgenda', 'fechaAgenda', 'fechaRegistro']
        public dataSource =  new MatTableDataSource([])
        public hoy = new Date()


        ngOnInit(): void {

        }


        ngAfterViewInit(): void {

        }


        ngOnDestroy(): void {

        }


        constructor(
            private _modalService : MatDialog,
            private _entidadService : EntidadService,
            private sweetAlertService : Sweetalert2Service,
            private utilService : UtilityService
        ){}




        public descargarData(): void {

            const data = this.dataSource.data
            this.utilService.exportAsExcelFile(data,'Entidades_registradas')

        }


        public filtrar(text): void {
            this.dataSource.filter = text

        }


        public listarAgendas(): void {

            const fecha = moment(this.hoy).format("YYYY-MM-DD")



            this._entidadService.listarAgenda(fecha).subscribe({
                next:(resp)=>{

                    this.dataSource = new MatTableDataSource(resp?.data || [])
                    this.dataSource.paginator = this.paginador


                },
                error:(e)=>{
                     this.dataSource = new  MatTableDataSource([])
                    this.dataSource.paginator = this.paginador
                    this.sweetAlertService.alertInfo({})
                }
            })

        }




        public crearCita(agenda): void {
             this._modalService.open(ModalCitasComponent, {
                        width:'700px',
                        maxWidth: '90vw',
                        data:agenda
                    }).afterClosed().subscribe((resp)=>{

                        if(!resp){
                            return
                        }

                        this.listarAgendas()



                    })
        }





        public crearAgenda(): void {

                    this._modalService.open(ModalAgendasComponent, {
                        width:'700px',
                        maxWidth: '90vw'
                    }).afterClosed().subscribe((resp)=>{

                        if(!resp){
                            return
                        }

                        this.listarAgendas()



                    })



                }





}
