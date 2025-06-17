import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SharedModuleModule } from 'app/shared/module/shared-module.module';
import { ModalAgendasComponent } from './modal-agendas/modal-agendas.component';
import { EntidadService } from 'app/core/services/entidad.service';
import moment from 'moment';
import { Sweetalert2Service } from '../../../core/services/sweetalert2.service';

@Component({
  selector: 'app-agendas',
  templateUrl: './agendas.component.html',
  styleUrls: ['./agendas.component.scss'],
  standalone:true,
  imports: [SharedModuleModule]
})
export class AgendasComponent implements OnInit, AfterViewInit, OnDestroy {

      @ViewChild(MatPaginator) paginador : MatPaginator

        public displayedColumns = [ 'fecha_hora', 'tipo_comida', 'info_pedidor', 'cargo_pedidor', 'info_Autizado', 'cargoAutorizado']
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
            private sweetAlertService : Sweetalert2Service
        ){}


        public listarAgendas(): void {

            const fecha = moment(this.hoy).format("YYYY-MM-DD")



            this._entidadService.listarAgenda(fecha).subscribe({
                next:(resp)=>{

                    this.dataSource = new MatTableDataSource(resp?.data || [])


                },
                error:(e)=>{
                    this.sweetAlertService.alertError(e)
                }
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
