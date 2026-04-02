import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetModal } from './timesheet-modal';

describe('TimesheetModal', () => {
  let component: TimesheetModal;
  let fixture: ComponentFixture<TimesheetModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimesheetModal],
    }).compileComponents();

    fixture = TestBed.createComponent(TimesheetModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
