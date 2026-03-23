import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'div[app-create-department-modal]',
  imports: [ReactiveFormsModule],
  templateUrl: './create-department-modal.html',
  styleUrl: './create-department-modal.scss',
})

export class CreateDepartmentModal {
  private formBuilder = inject(FormBuilder);

  department = this.formBuilder.group({
    name: ['', [Validators.required]],
    departmentHead: ['', [Validators.required]],
    openPositions: [0, [Validators.min(0)]],
    status: ['active', [Validators.required]],
    description: ['', [Validators.required, Validators.minLength(10)]]
  })

  emitClose = output<void>();

  showError(controlName: string, errorName: string) {
    let control = this.department.get(controlName);

    return control?.invalid && (control?.dirty || control?.touched) && control?.hasError(errorName);
  }

  onSubmit() {
    if (this.department.invalid) {
      this.department.markAllAsTouched();

      return;
    }

    console.log(this.department.value);
    this.department.reset();
    this.emitClose.emit();
  }

  onCancel() {
    this.emitClose.emit();
  }




}

//  jobCreationForm = this.formBuilder.group({
//     title: ['', [Validators.required]],
//     department: ['', [Validators.required]],
//     location: [''],
//     employmentType: ['', [Validators.required]],
//     minExperienceRequired: [0],
//     minSalary: [0],
//     maxSalary: [0],
//     requiredSkills: ['', [Validators.required]],
//     jobDescription: ['', [Validators.required]],
//     jobStatus: ['open']
//   })
