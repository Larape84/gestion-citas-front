import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SharedModuleModule } from 'app/shared/module/shared-module.module';
import { ModalUsuariosComponent } from './modal-usuarios/modal-usuarios.component';
import { UtilityService } from 'app/core/services/utility.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  standalone:true,
  imports: [SharedModuleModule]
})
export class UsuariosComponent implements OnInit, AfterViewInit, OnDestroy {

      @ViewChild(MatPaginator) paginador : MatPaginator

        public displayedColumns = [ 'fecha_hora', 'tipo_comida', 'info_pedidor', 'cargo_pedidor', 'info_Autizado', 'cargoAutorizado']
        public dataSource =  new MatTableDataSource([])


        ngOnInit(): void {

        }


        ngAfterViewInit(): void {

        }


        ngOnDestroy(): void {

        }


        constructor(
            private _modalService : MatDialog,
            private utilService : UtilityService
        ){}


        public listarUsuarios(): void {

        }


        public descargarData(): void {

            const data = this.dataSource.data
            this.utilService.exportAsExcelFile(data,'Usuarios_registrados')

        }


        public filtrar(text): void {
            this.dataSource.data = text

        }

        public crearUsuario(): void {

                    this._modalService.open(ModalUsuariosComponent, {
                        width:'700px',
                        maxWidth: '90vw',

                    }).afterClosed().subscribe((resp)=>{

                        if(!resp){
                            return
                        }

                        this.listarUsuarios()

                    })





                }

}
