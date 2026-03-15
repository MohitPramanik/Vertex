import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Payslips } from './payslips';

describe('Payslips', () => {
  let component: Payslips;
  let fixture: ComponentFixture<Payslips>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Payslips],
    }).compileComponents();

    fixture = TestBed.createComponent(Payslips);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
