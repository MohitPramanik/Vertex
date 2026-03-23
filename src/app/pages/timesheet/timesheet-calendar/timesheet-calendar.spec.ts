import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetCalendar } from './timesheet-calendar';

describe('TimesheetCalendar', () => {
  let component: TimesheetCalendar;
  let fixture: ComponentFixture<TimesheetCalendar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimesheetCalendar],
    }).compileComponents();

    fixture = TestBed.createComponent(TimesheetCalendar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
