import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { SharedModuleModule } from 'app/shared/module/shared-module.module';
import { QRCodeModule } from 'angularx-qrcode';
import { InicioSesionService } from 'app/modules/auth/sign-in/inicio-sesion.service';

@Component({
  selector: 'app-codigo-qr',
  templateUrl: './codigo-qr.component.html',
  styleUrls: ['./codigo-qr.component.scss'],
  standalone:true,
  imports:[SharedModuleModule, QRCodeModule],
  encapsulation:ViewEncapsulation.None
})
export class CodigoQrComponent  implements OnInit{

    @ViewChild('qrcode', { static: false }) qrcodeElement!: ElementRef;

    public user = null


    constructor(
        private _inicioSesionService: InicioSesionService
    ){}




    ngOnInit(): void {
        this.user =  this._inicioSesionService.obtenerUsuario()
        this.qrData = this.user.id
    }


    qrData = 'https://tu-sitio-web.com';


    public descargar(): void {

        const qrElement = this.qrcodeElement.nativeElement.querySelector('div.qrleo canvas');


        if (qrElement) {
          const image = qrElement.toDataURL('image/png');
          const link = document.createElement('a');
          link.href = image;
          link.download = `codigo-qr-${this.user.nombre} ${this.user.apellido}.png`;
          link.click();
    }

    }


}
