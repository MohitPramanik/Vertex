import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeFilter } from './employee-filter';

describe('EmployeeFilter', () => {
  let component: EmployeeFilter;
  let fixture: ComponentFixture<EmployeeFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeFilter],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
