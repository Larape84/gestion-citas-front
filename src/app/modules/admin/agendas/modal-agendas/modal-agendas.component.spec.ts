import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgendasComponent } from './modal-agendas.component';

describe('ModalAgendasComponent', () => {
  let component: ModalAgendasComponent;
  let fixture: ComponentFixture<ModalAgendasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAgendasComponent]
    });
    fixture = TestBed.createComponent(ModalAgendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
