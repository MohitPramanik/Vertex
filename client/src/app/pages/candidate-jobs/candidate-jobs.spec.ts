import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateJobsPage } from './candidate-jobs';

describe('CandidateJobsPage', () => {
  let component: CandidateJobsPage;
  let fixture: ComponentFixture<CandidateJobsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidateJobsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CandidateJobsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
