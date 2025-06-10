import { Component } from '@angular/core';
import { SharedModuleModule } from 'app/shared/module/shared-module.module';

@Component({
  selector: 'app-entidades',
  templateUrl: './entidades.component.html',
  styleUrls: ['./entidades.component.scss'],
  standalone:true,
  imports: [SharedModuleModule]
})
export class EntidadesComponent {

}
