import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'div[app-create-job-modal]',
  imports: [ReactiveFormsModule],
  templateUrl: './create-job-modal.html',
  styleUrl: './create-job-modal.scss',
})
export class CreateJobModal {

  private formBuilder = inject(FormBuilder);

  jobForm = this.formBuilder.group({
    title: ['', [Validators.required]],
    department: ['', [Validators.required]],
    location: [''],
    employmentType: ['', [Validators.required]],
    minExperienceRequired: [0, [Validators.min(0)]],
    minSalary: [0, [Validators.min(0)]],
    maxSalary: [0, [Validators.min(0)]],
    requiredSkills: ['', [Validators.required]],
    description: ['', [Validators.required]],
    status: ['open']
  })

  emitClose = output<void>();

  showError(controlName: string, errorName: string) {
    const control = this.jobForm.get(controlName);

    return control?.invalid && (control.dirty || control.touched) && control.hasError(errorName);
  }

  onSubmit() {
    if (this.jobForm.invalid) {
      this.jobForm.markAllAsTouched()
      return;
    }

    console.log(this.jobForm.value);
    this.jobForm.reset();
    this.emitClose.emit();
  }

  onClose() {
    this.emitClose.emit();
  }
}
