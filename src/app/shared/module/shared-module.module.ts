import { NgModule } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { CustomMatPaginatorIntl } from '../Class/paginador.class';
import {MatMenuModule} from '@angular/material/menu';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import {MatSidenavModule} from '@angular/material/sidenav';
import { PermisosModuloDirective } from '../directives/permisoModulo.directive';
import { DataTablePipe } from '../pipes/data.table.pipe';
import {MatTooltipModule} from '@angular/material/tooltip';
import { InputSwitchModule } from 'primeng/inputswitch';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MultiSelectModule } from 'primeng/multiselect';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';  

export const MY_DATE_FORMATS = {
    parse: {
        dateInput: 'DD/MM/YYYY',  // Formato que aceptará al ingresar
      },
      display: {
        dateInput: 'dd/MM/yyyy',  // Formato que mostrará en el input
        monthYearLabel: 'MMM YYYY',  // Formato que muestra el mes y año en el Datepicker
        dateA11yLabel: 'DD/MM/YYYY',  // Formato para accesibilidad (screen readers)
        monthYearA11yLabel: 'MMMM YYYY',  // Formato de accesibilidad para el mes y año
      },
  };

@NgModule({
  declarations: [PermisosModuloDirective, DataTablePipe],
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatOptionModule,
    FormsModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTableModule,
    MatMenuModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MatSidenavModule,
    MatTooltipModule,
    InputSwitchModule,
    MatDatepickerModule,
    MultiSelectModule,
    MatAutocompleteModule,








  ],
  exports:[MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatPaginatorModule,
    ReactiveFormsModule,MatOptionModule,
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTableModule,
    MatMenuModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MatSidenavModule,
    PermisosModuloDirective,
    DataTablePipe,
    MatTooltipModule,
    InputSwitchModule,
    MatDatepickerModule,
    MultiSelectModule,
    MatAutocompleteModule,




],
providers: [
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl },
    provideNgxMask(),
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },


  ]
})
export class SharedModuleModule { }
