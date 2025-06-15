import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SharedModuleModule } from 'app/shared/module/shared-module.module';
import { ModalEntidadesComponent } from './modal-entidades/modal-entidades.component';

@Component({
  selector: 'app-entidades',
  templateUrl: './entidades.component.html',
  styleUrls: ['./entidades.component.scss'],
  standalone:true,
  imports: [SharedModuleModule]
})
export class EntidadesComponent implements OnInit, AfterViewInit, OnDestroy {

      @ViewChild(MatPaginator) paginador : MatPaginator

        public displayedColumns = [ 'fecha_hora', 'tipo_comida', 'info_pedidor', 'cargo_pedidor', 'info_Autizado', 'cargoAutorizado']
        public dataSource =  new MatTableDataSource([])




        constructor(
            private _modalService: MatDialog
        ){}



        ngOnInit(): void {

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
            })



        }




}
