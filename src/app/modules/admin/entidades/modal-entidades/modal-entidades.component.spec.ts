import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEntidadesComponent } from './modal-entidades.component';

describe('ModalEntidadesComponent', () => {
  let component: ModalEntidadesComponent;
  let fixture: ComponentFixture<ModalEntidadesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalEntidadesComponent]
    });
    fixture = TestBed.createComponent(ModalEntidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
