import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanQrComponent } from './scan-qr.component';

describe('ScanQrComponent', () => {
  let component: ScanQrComponent;
  let fixture: ComponentFixture<ScanQrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScanQrComponent]
    });
    fixture = TestBed.createComponent(ScanQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
