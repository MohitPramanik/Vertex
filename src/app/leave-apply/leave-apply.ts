import { Component, computed, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LeaveType } from '../leave/leave.models';
import { LeaveStore } from '../leave/leave.store';
import { isPaidLeaveType } from '../leave/leave.utils';

type ApplyForm = FormGroup<{
  type: FormControl<LeaveType>;
  startDate: FormControl<string>;
  endDate: FormControl<string>;
  reason: FormControl<string>;
}>;

@Component({
  selector: 'section[leave-apply]',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './leave-apply.html',
  styleUrl: './leave-apply.scss',
  host: { class: 'max-w-[68rem] m-auto p-5' },
})
export class LeaveApply {
  readonly leaveStore = inject(LeaveStore);
  private readonly router = inject(Router);

  readonly leaveTypes: LeaveType[] = ['Annual', 'Sick', 'Casual', 'Unpaid'];

  readonly form: ApplyForm = new FormGroup({
    type: new FormControl<LeaveType>('Annual', { nonNullable: true, validators: [Validators.required] }),
    startDate: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    endDate: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    reason: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(400)] }),
  });

  readonly submitError = signal<string>('');
  readonly submitSuccess = signal<string>('');

  readonly days = computed(() => {
    const start = this.form.controls.startDate.value;
    const end = this.form.controls.endDate.value;
    if (!start || !end) return null;
    return this.leaveStore.calculateDays(start, end);
  });

  readonly balanceHint = computed(() => {
    const type = this.form.controls.type.value;
    if (!isPaidLeaveType(type)) return null;
    return this.leaveStore.balances()[type];
  });

  submit() {
    this.submitError.set('');
    this.submitSuccess.set('');

    if (this.form.invalid) {
      this.submitError.set('Please fill all required fields.');
      return;
    }

    const result = this.leaveStore.applyLeave({
      type: this.form.controls.type.value,
      startDate: this.form.controls.startDate.value,
      endDate: this.form.controls.endDate.value,
      reason: this.form.controls.reason.value.trim(),
    });

    if (!result.ok) {
      this.submitError.set(result.error);
      return;
    }

    this.submitSuccess.set('Leave request submitted.');
    this.form.reset({ type: this.form.controls.type.value, startDate: '', endDate: '', reason: '' });
    this.router.navigateByUrl('/leave/requests');
  }
}
