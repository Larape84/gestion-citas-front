import { Component } from '@angular/core';
import { SharedModuleModule } from 'app/shared/module/shared-module.module';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  standalone:true,
  imports: [SharedModuleModule]
})
export class UsuariosComponent {

}
