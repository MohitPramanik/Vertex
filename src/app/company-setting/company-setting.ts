import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CompanySettingStore } from './company-setting.store';

type WeekStart = 'Monday' | 'Sunday';
type DayCode = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

type CompanyForm = FormGroup<{
  companyName: FormControl<string>;
  hrEmail: FormControl<string>;
  timezone: FormControl<string>;
  weekStartsOn: FormControl<WeekStart>;
  workingDays: FormControl<Record<DayCode, boolean>>;
  annual: FormControl<number>;
  sick: FormControl<number>;
  casual: FormControl<number>;
}>;

@Component({
  selector: 'section[company-setting-page]',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './company-setting.html',
  styleUrl: './company-setting.scss',
  host: { class: 'max-w-[68rem] m-auto p-5' },
})
export class CompanySettingPage {
  readonly store = inject(CompanySettingStore);

  readonly saved = signal<boolean>(false);
  readonly error = signal<string>('');

  readonly days: DayCode[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  readonly timezones = ['Asia/Kolkata', 'UTC', 'America/New_York', 'Europe/London', 'Asia/Singapore'];

  readonly form: CompanyForm = new FormGroup({
    companyName: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(80)] }),
    hrEmail: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    timezone: new FormControl('Asia/Kolkata', { nonNullable: true, validators: [Validators.required] }),
    weekStartsOn: new FormControl<WeekStart>('Monday', { nonNullable: true, validators: [Validators.required] }),
    workingDays: new FormControl<Record<DayCode, boolean>>(
      { Mon: true, Tue: true, Wed: true, Thu: true, Fri: true, Sat: false, Sun: false },
      { nonNullable: true, validators: [Validators.required] }
    ),
    annual: new FormControl(12, { nonNullable: true, validators: [Validators.required, Validators.min(0), Validators.max(60)] }),
    sick: new FormControl(8, { nonNullable: true, validators: [Validators.required, Validators.min(0), Validators.max(60)] }),
    casual: new FormControl(6, { nonNullable: true, validators: [Validators.required, Validators.min(0), Validators.max(60)] }),
  });

  constructor() {
    const s = this.store.setting();
    const flags = this.days.reduce((acc, d) => ({ ...acc, [d]: s.workingDays.includes(d) }), {} as Record<DayCode, boolean>);
    this.form.setValue({
      companyName: s.companyName,
      hrEmail: s.hrEmail,
      timezone: s.timezone,
      weekStartsOn: s.weekStartsOn,
      workingDays: flags,
      annual: s.defaultLeavePolicy.annual,
      sick: s.defaultLeavePolicy.sick,
      casual: s.defaultLeavePolicy.casual,
    });
  }

  toggleDay(day: DayCode) {
    const current = this.form.controls.workingDays.value;
    this.form.controls.workingDays.setValue({ ...current, [day]: !current[day] });
  }

  save() {
    this.saved.set(false);
    this.error.set('');

    if (this.form.invalid) {
      this.error.set('Please fix validation errors before saving.');
      return;
    }

    const workingDays = this.days.filter((d) => this.form.controls.workingDays.value[d]);
    if (!workingDays.length) {
      this.error.set('Please select at least one working day.');
      return;
    }

    this.store.update({
      companyName: this.form.controls.companyName.value.trim(),
      hrEmail: this.form.controls.hrEmail.value.trim(),
      timezone: this.form.controls.timezone.value,
      weekStartsOn: this.form.controls.weekStartsOn.value,
      workingDays,
      defaultLeavePolicy: {
        annual: this.form.controls.annual.value,
        sick: this.form.controls.sick.value,
        casual: this.form.controls.casual.value,
      },
    });

    this.saved.set(true);
  }
}

