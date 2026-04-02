import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, inject, OnInit, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiResponse } from '../../../interfaces/api';

interface Department {
  _id: string;
  name: string;
}

@Component({
  selector: 'div[app-create-job-modal]',
  imports: [ReactiveFormsModule],
  templateUrl: './create-job-modal.html',
  styleUrl: './create-job-modal.scss',
})


export class CreateJobModal {

  private http = inject(HttpClient);
  private formBuilder = inject(FormBuilder);


  departments = signal<Department[]>([]);

  jobForm = this.formBuilder.group({
    title: ['', [Validators.required]],
    department: ['', [Validators.required]],
    location: [''],
    employmentType: ['', [Validators.required]],
    requiredExperienceInYears: [0, [Validators.min(0)]],
    salaryRange: this.formBuilder.group({
      min: [0, [Validators.min(0)]],
      max: [0, [Validators.min(0)]]
    }),
    requiredSkills: ['', [Validators.required]],
    description: ['', [Validators.required]],
    status: ['open'],
    openPositions: [1, [Validators.min(0)]]
  })

  constructor() {
    this.http.get<ApiResponse>("http://localhost:8000/api/department")
      .subscribe(res => {
        if (res.data) {
          this.departments.set(res.data)
          console.log(this.departments);
        }
      })
  }


  emitClose = output<string | void>();

  showError(controlName: string, errorName: string) {
    const control = this.jobForm.get(controlName);

    return control?.invalid && (control.dirty || control.touched) && control.hasError(errorName);
  }

  onSubmit() {
    if (this.jobForm.invalid) {
      this.jobForm.markAllAsTouched()
      return;
    }

    const formData = this.jobForm.value;

    const payload = {
      ...formData,
      requiredSkills: formData.requiredSkills?.split(",")
        .map((skill) => skill.trim())
    }

    this.http.post("http://localhost:8000/api/job", payload)
      .subscribe(res => {
        this.jobForm.reset();
        this.emitClose.emit("added");
      })
  }

  onClose() {
    this.emitClose.emit();
  }
}
