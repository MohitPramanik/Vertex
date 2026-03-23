import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCandidateModal } from './create-candidate-modal';

describe('CreateCandidateModal', () => {
  let component: CreateCandidateModal;
  let fixture: ComponentFixture<CreateCandidateModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCandidateModal],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCandidateModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
