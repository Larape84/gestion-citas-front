import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Sweetalert2Service } from 'app/core/services/sweetalert2.service';
import { UtilityService } from 'app/core/services/utility.service';
import { SharedModuleModule } from 'app/shared/module/shared-module.module';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-panel-control',
  templateUrl: './panel-control.component.html',
  styleUrls: ['./panel-control.component.scss'],
  standalone:true,
  imports:[SharedModuleModule]
})
export class PanelControlComponent implements OnInit {
    @ViewChild(MatPaginator) paginador : MatPaginator


    public viewMode = 'XLarge'
    dataSource =  new MatTableDataSource([])
    public displayedColumns = ['documento', 'nombre','apellido', 'cargo', 'centro', 'activo', 'usuario', 'gestor', 'admin']

    constructor(
        private _sweetalertService : Sweetalert2Service,
        private _utilService: UtilityService
    ){}


    ngOnInit(): void {
        this.listarUsuarios()
        this._utilService.getWidth().subscribe({next:(resp)=>{this.viewMode = resp}});
    }




    public modalusuarios():void {

    }


    public listarUsuarios(loading = true): void {

        if(loading){
            this._sweetalertService.startLoading({})
            new MatTableDataSource([])
        }


    }


    public descargarData(): void {
        const data = this.dataSource.data.map((value)=>{

                const item = {
                   'Nro de documento': value.id,
                    Nombres : value.nombre,
                    Apellidos: value.apellido,
                    Cargo: value.cargo,
                    'Centro de formación': value.centroCosto,
                    'Usuario activo': value.activo,
                    'Codigo Qr': value.permisos[0].access.usuario,
                    'Restaurant' : value.permisos[0].access.gestor,
                    'Administrador': value.permisos[0].access.admin
                }


                return item



        })
        const hoy = DateTime.local().toFormat('dd-MM-yyyy HH mm');
        const reporte = `Reporte de usuarios registrados a corte ${hoy}`
        this._utilService.exportAsExcelFile(data,reporte)


    }


    public filtrar(value: string): void {
        this.dataSource.filter = value
    }


    public cambiarEstadoDependencia(usuario): void {

        this._sweetalertService.startLoading({})



    }
}
