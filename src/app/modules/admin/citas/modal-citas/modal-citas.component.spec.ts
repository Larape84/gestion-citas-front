import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCitasComponent } from './modal-citas.component';

describe('ModalCitasComponent', () => {
  let component: ModalCitasComponent;
  let fixture: ComponentFixture<ModalCitasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCitasComponent]
    });
    fixture = TestBed.createComponent(ModalCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
