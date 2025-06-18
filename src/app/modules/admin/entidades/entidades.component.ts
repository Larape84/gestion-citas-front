import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SharedModuleModule } from 'app/shared/module/shared-module.module';
import { ModalEntidadesComponent } from './modal-entidades/modal-entidades.component';
import { EntidadService } from 'app/core/services/entidad.service';
import { Sweetalert2Service } from 'app/core/services/sweetalert2.service';
import { ModalAgendasComponent } from '../agendas/modal-agendas/modal-agendas.component';
import { UtilityService } from 'app/core/services/utility.service';

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
            private sweetalerService: Sweetalert2Service,
            private utilService: UtilityService
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


          public descargarData(): void {

            const data = this.dataSource.data
            this.utilService.exportAsExcelFile(data,'Entidades_registradas')

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


        public filtrar(text): void {

            this.dataSource.filter = text

        }

        public listarEntidad(): void {

            this._entidadService.listarEntidad().subscribe({
                next:(resp)=>{
                    this.dataSource = new MatTableDataSource(resp.data)
                    this.dataSource.paginator = this.paginador

                },
                error:(e)=>{
                    this.dataSource = new  MatTableDataSource([])
                    this.dataSource.paginator = this.paginador
                    this.sweetalerService.alertError(e)

                }
            })



        }




}
