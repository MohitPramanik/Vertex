import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceModal } from './attendance-modal';

describe('AttendanceModal', () => {
  let component: AttendanceModal;
  let fixture: ComponentFixture<AttendanceModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceModal],
    }).compileComponents();

    fixture = TestBed.createComponent(AttendanceModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
