import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SharedModuleModule } from 'app/shared/module/shared-module.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss'],
  standalone:true,
  imports: [SharedModuleModule]
})
export class CitasComponent implements OnInit, AfterViewInit, OnDestroy {

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
