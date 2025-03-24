import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrosRealizadosComponent } from './registros-realizados.component';

describe('RegistrosRealizadosComponent', () => {
  let component: RegistrosRealizadosComponent;
  let fixture: ComponentFixture<RegistrosRealizadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrosRealizadosComponent]
    });
    fixture = TestBed.createComponent(RegistrosRealizadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
