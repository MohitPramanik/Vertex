import { Component, computed, effect, inject, model, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AttendanceStore } from '../attendance/attendance.store';

@Component({
  selector: 'div[app-attendance-modal]',
  imports: [ReactiveFormsModule],
  templateUrl: './attendance-modal.html',
  styleUrl: './attendance-modal.scss',
})
export class AttendanceModal {
  private readonly attendanceStore = inject(AttendanceStore);

  workHours = Array.from({ length: 12 })
  projects = ["MLCHC", "Quality Now", "SilverBullet", "Internal"]

  isTimeSheetModelOpen = model<boolean>();
  selectedDate = model<string>();

  readonly error = signal<string>('');
  readonly saved = signal<boolean>(false);

  today = new Date();
  maxDate = this.formatDate(this.today);
  // min date would be prev 5 days
  minDate = this.formatDate(
    new Date(this.today.getTime() - 5 * 24 * 60 * 60 * 1000)
  );

  readonly form = new FormGroup({
    date: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    hours: new FormControl<number | null>(null, { validators: [Validators.required, Validators.min(1), Validators.max(24)] }),
    project: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl('', { nonNullable: true }),
  });

  readonly isEdit = computed(() => {
    const date = this.form.controls.date.value;
    if (!date) return false;
    return !!this.attendanceStore.getCurrentEmployeeEntryByDate(date);
  });

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  constructor() {
    effect(() => {
      const d = this.selectedDate();
      if (!d) return;
      this.saved.set(false);
      this.error.set('');

      const existing = this.attendanceStore.getCurrentEmployeeEntryByDate(d);
      this.form.setValue({
        date: d,
        hours: existing?.hours ?? null,
        project: existing?.project ?? '',
        description: existing?.description ?? '',
      });
    });
  }

  close() {
    this.isTimeSheetModelOpen.set(false);
  }

  submit() {
    this.error.set('');
    this.saved.set(false);

    if (this.form.invalid) {
      this.error.set('Please fill required fields.');
      return;
    }

    const result = this.attendanceStore.upsertEntry({
      date: this.form.controls.date.value,
      hours: Number(this.form.controls.hours.value),
      project: this.form.controls.project.value,
      description: this.form.controls.description.value,
    });

    if (!result.ok) {
      this.error.set(result.error);
      return;
    }

    this.saved.set(true);
    this.close();
  }
}
