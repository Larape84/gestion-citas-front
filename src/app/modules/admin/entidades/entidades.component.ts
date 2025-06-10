import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SharedModuleModule } from 'app/shared/module/shared-module.module';

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


        ngOnInit(): void {

        }


        ngAfterViewInit(): void {

        }


        ngOnDestroy(): void {

        }


        constructor(){}




}
