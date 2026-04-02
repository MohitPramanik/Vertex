import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'div[app-timesheet-modal]',
  imports: [ReactiveFormsModule],
  templateUrl: './timesheet-modal.html',
  styleUrl: './timesheet-modal.scss',
})

export class TimesheetModal {
  workHours = Array.from({ length: 9 });
  projects = ["MLCHC", "Quality Now", "SilverBullet", "Internal"];
  today = new Date();
  isSubmitted = output<void>();

  maxDate = this.formatDate(this.today);
  // min date would be prev 5 days
  minDate = this.formatDate(
    new Date(this.today.getTime() - 5 * 24 * 60 * 60 * 1000)
  );
  isSaved = false;


  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  canDeactivate(): boolean | Observable<boolean> {
    if (!this.isSaved) {
      return confirm('You have unsaved changes. Do you really want to leave');
    }

    return true;
  }

  private formBuilder = inject(FormBuilder);

  timeSheet = this.formBuilder.nonNullable.group({
    date: [this.formatDate(this.today), [Validators.required]],
    workHours: [0, [Validators.min(1)]],
    project: ['', [Validators.required]],
    description: ['']
  })

  showError(controlName: string, errorName: string) {
    const control = this.timeSheet.get(controlName);

    return control?.invalid && (control.dirty || control.touched) && control.hasError(errorName);
  }

  onSubmit() {

    if (this.timeSheet.invalid) {
      // Mark all controls as touched to trigger validation messages
      this.timeSheet.markAllAsTouched();
      return;
    }
    console.log(this.timeSheet.value);
    this.isSubmitted.emit();
  }

  constructor() {
    console.log(this.formatDate(this.today));
  }
}
