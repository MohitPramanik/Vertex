import { Component, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserRole } from '../profile/profile.models';
import { ManagedUser, UserStatus } from './user-manage.models';
import { UserManageStore } from './user-manage.store';

type AddForm = FormGroup<{
  id: FormControl<string>;
  name: FormControl<string>;
  email: FormControl<string>;
  role: FormControl<UserRole>;
  status: FormControl<UserStatus>;
}>;

@Component({
  selector: 'section[user-manage-page]',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './user-manage.html',
  styleUrl: './user-manage.scss',
  host: { class: 'max-w-[68rem] m-auto p-5' },
})
export class UserManagePage {
  readonly store = inject(UserManageStore);

  readonly roles: UserRole[] = ['Employee', 'Manager', 'HR', 'Admin'];
  readonly statuses: UserStatus[] = ['Active', 'Inactive'];

  readonly query = signal<string>('');
  get queryValue() {
    return this.query();
  }
  set queryValue(v: string) {
    this.query.set(v);
  }

  readonly error = signal<string>('');
  readonly addForm: AddForm = new FormGroup({
    id: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(10)] }),
    name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(60)] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    role: new FormControl<UserRole>('Employee', { nonNullable: true, validators: [Validators.required] }),
    status: new FormControl<UserStatus>('Active', { nonNullable: true, validators: [Validators.required] }),
  });

  readonly users = computed<ManagedUser[]>(() => {
    const q = this.query().trim().toLowerCase();
    if (!q) return this.store.users();
    return this.store.users().filter((u) => {
      return (
        u.id.toLowerCase().includes(q) ||
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q) ||
        u.status.toLowerCase().includes(q)
      );
    });
  });

  addUser() {
    this.error.set('');
    if (this.addForm.invalid) {
      this.error.set('Please fill valid user details.');
      return;
    }

    const result = this.store.addUser({
      id: this.addForm.controls.id.value,
      name: this.addForm.controls.name.value,
      email: this.addForm.controls.email.value,
      role: this.addForm.controls.role.value,
      status: this.addForm.controls.status.value,
    });

    if (!result.ok) {
      this.error.set(result.error);
      return;
    }

    this.addForm.reset({ id: '', name: '', email: '', role: 'Employee', status: 'Active' });
  }

  updateRole(userId: string, role: UserRole) {
    this.store.updateUser(userId, { role });
  }

  updateStatus(userId: string, status: UserStatus) {
    this.store.updateUser(userId, { status });
  }

  remove(userId: string) {
    this.store.removeUser(userId);
  }

  resetSeed() {
    this.store.resetSeed();
  }
}

