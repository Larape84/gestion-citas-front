import { Component, ElementRef, ViewChild } from '@angular/core';
import { SharedModuleModule } from 'app/shared/module/shared-module.module';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-codigo-qr',
  templateUrl: './codigo-qr.component.html',
  styleUrls: ['./codigo-qr.component.scss'],
  standalone:true,
  imports:[SharedModuleModule, QRCodeModule]
})
export class CodigoQrComponent {


    qrData = 'https://tu-sitio-web.com';


}
