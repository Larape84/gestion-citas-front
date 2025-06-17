import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SharedModuleModule } from 'app/shared/module/shared-module.module';
import { ModalEntidadesComponent } from './modal-entidades/modal-entidades.component';
import { EntidadService } from 'app/core/services/entidad.service';
import { Sweetalert2Service } from 'app/core/services/sweetalert2.service';
import { ModalAgendasComponent } from '../agendas/modal-agendas/modal-agendas.component';

@Component({
  selector: 'app-entidades',
  templateUrl: './entidades.component.html',
  styleUrls: ['./entidades.component.scss'],
  standalone:true,
  imports: [SharedModuleModule]
})
export class EntidadesComponent implements OnInit, AfterViewInit, OnDestroy {

      @ViewChild(MatPaginator) paginador : MatPaginator

        public displayedColumns = ['editar', 'nitEntidad', 'nombre', 'direccion', 'telefono', 'fechaRegistro']
        public dataSource =  new MatTableDataSource([])




        constructor(
            private _modalService: MatDialog,
            private _entidadService: EntidadService,
            private sweetalerService: Sweetalert2Service
        ){}



        ngOnInit(): void {
            this.listarEntidad()
        }


        ngAfterViewInit(): void {

        }


        ngOnDestroy(): void {

        }



        public crearEntidad(entidad): void {

            this._modalService.open(ModalEntidadesComponent, {
                width:'700px',
                maxWidth: '90vw',
                data:entidad
            }).afterClosed().subscribe((resp)=>{

                if(!resp){
                    return
                }

                this.listarEntidad()

            })



        }



        public crearAgenda(entidad): void {

            this._modalService.open(ModalAgendasComponent, {
                width:'700px',
                maxWidth: '90vw',
                data:entidad
            }).afterClosed().subscribe((resp)=>{

                if(!resp){
                    return
                }

                this.listarEntidad()

            })





        }

        public listarEntidad(): void {

            this._entidadService.listarEntidad().subscribe({
                next:(resp)=>{
                    this.dataSource = new MatTableDataSource(resp.data)

                },
                error:(e)=>{
                    this.sweetalerService.alertError(e)

                }
            })



        }




}
