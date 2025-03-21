import { ChangeDetectionStrategy, ChangeDetectorRef, Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { InicioSesionService } from 'app/modules/auth/sign-in/inicio-sesion.service';

@Directive({
  selector: '[appPermiso]'
})
export class PermisosModuloDirective  {

    @Input() set appPermiso(mode: 'crear' | 'editar' | 'eliminar') {
        this.viewContainer.clear();


            switch (mode) {
                case 'crear':
                    if (this.permisos?.crear) {
                        this.viewContainer.createEmbeddedView(this.templateRef);
                      } else {
                        this.viewContainer.clear()
                      }
                  break;
                case 'editar':
                    if (this.permisos?.editar) {
                        this.viewContainer.createEmbeddedView(this.templateRef);
                      } else {
                        this.viewContainer.clear()
                      }
                  break;
                case 'eliminar':
                    if (this.permisos?.eliminar) {
                        this.viewContainer.createEmbeddedView(this.templateRef);
                      } else {
                        this.viewContainer.clear()
                      }
                  break;
                default:
                  this.viewContainer.clear();

              }




    }
  private readonly permisos

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private permisosService: InicioSesionService,
    private _detechChanges: ChangeDetectorRef
  ) {
    this.permisos = this.permisosService.obtenerPermisosModulo();
  }





}
