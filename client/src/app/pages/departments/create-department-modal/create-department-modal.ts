import { HttpClient } from '@angular/common/http';
import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'div[app-create-department-modal]',
  imports: [ReactiveFormsModule],
  templateUrl: './create-department-modal.html',
  styleUrl: './create-department-modal.scss',
})

export class CreateDepartmentModal {

  private http = inject(HttpClient);
  private formBuilder = inject(FormBuilder);

  department = this.formBuilder.group({
    name: ['', [Validators.required]],
    head: ['', [Validators.required]],
    openPositions: [0, [Validators.min(0)]],
    status: ['active', [Validators.required]]
  })

  emitClose = output<string | void>();

  showError(controlName: string, errorName: string) {
    let control = this.department.get(controlName);

    return control?.invalid &&
      (control?.dirty || control?.touched) &&
      control?.hasError(errorName);
  }

  onSubmit() {
    if (this.department.invalid) {
      this.department.markAllAsTouched();
      return;
    }

    this.http.post("http://localhost:8000/api/department", this.department.value).subscribe(() => {
      this.department.reset();
      this.emitClose.emit("added")
    })

  }

  onCancel() {
    this.emitClose.emit();
  }




}

