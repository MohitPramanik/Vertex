import { Component, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProfileStore } from './profile.store';
import { UserRole } from './profile.models';

type ProfileForm = FormGroup<{
  employeeId: FormControl<string>;
  name: FormControl<string>;
  email: FormControl<string>;
  phone: FormControl<string>;
  role: FormControl<UserRole>;
  department: FormControl<string>;
  location: FormControl<string>;
  joinedOn: FormControl<string>;
}>;

@Component({
  selector: 'section[profile-page]',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
  host: { class: 'max-w-[68rem] m-auto p-5' },
})
export class ProfilePage {
  readonly store = inject(ProfileStore);

  readonly roles: UserRole[] = ['Employee', 'Manager', 'HR', 'Admin'];

  readonly saved = signal<boolean>(false);
  readonly error = signal<string>('');

  readonly form: ProfileForm = new FormGroup({
    employeeId: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(60)] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    phone: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(20)] }),
    role: new FormControl<UserRole>('Employee', { nonNullable: true, validators: [Validators.required] }),
    department: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(40)] }),
    location: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(40)] }),
    joinedOn: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  readonly initials = computed(() => {
    const name = this.form.controls.name.value.trim();
    if (!name) return 'U';
    const parts = name.split(/\s+/).filter(Boolean);
    return (parts[0]?.[0] ?? 'U').toUpperCase() + (parts[1]?.[0] ?? '').toUpperCase();
  });

  constructor() {
    const p = this.store.profile();
    this.form.setValue({
      employeeId: p.employeeId,
      name: p.name,
      email: p.email,
      phone: p.phone,
      role: p.role,
      department: p.department,
      location: p.location,
      joinedOn: p.joinedOn,
    });
  }

  save() {
    this.saved.set(false);
    this.error.set('');

    if (this.form.invalid) {
      this.error.set('Please fix validation errors before saving.');
      return;
    }

    this.store.update({
      employeeId: this.form.controls.employeeId.value.trim(),
      name: this.form.controls.name.value.trim(),
      email: this.form.controls.email.value.trim(),
      phone: this.form.controls.phone.value.trim(),
      role: this.form.controls.role.value,
      department: this.form.controls.department.value.trim(),
      location: this.form.controls.location.value.trim(),
      joinedOn: this.form.controls.joinedOn.value,
    });

    this.saved.set(true);
  }
}

