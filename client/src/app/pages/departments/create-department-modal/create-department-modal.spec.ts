import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDepartmentModal } from './create-department-modal';

describe('CreateDepartmentModal', () => {
  let component: CreateDepartmentModal;
  let fixture: ComponentFixture<CreateDepartmentModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDepartmentModal],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateDepartmentModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
