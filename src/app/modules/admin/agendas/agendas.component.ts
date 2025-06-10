import { Component } from '@angular/core';
import { SharedModuleModule } from 'app/shared/module/shared-module.module';

@Component({
  selector: 'app-agendas',
  templateUrl: './agendas.component.html',
  styleUrls: ['./agendas.component.scss'],
  standalone:true,
  imports: [SharedModuleModule]
})
export class AgendasComponent {

}
