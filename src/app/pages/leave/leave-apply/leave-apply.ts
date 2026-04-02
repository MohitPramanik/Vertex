import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth/auth-service';
import { Modal } from '../../../components/modal/modal';

@Component({
  selector: 'section[leave-apply]',
  imports: [ReactiveFormsModule, Modal],
  templateUrl: './leave-apply.html',
  styleUrl: './leave-apply.scss',
})
export class LeaveApply {
  private formBuilder = inject(FormBuilder);
  loading = signal<boolean>(false);
  error = signal<boolean>(false);
  isModalOpen = signal<boolean>(false);

  constructor(private http: HttpClient, private auth: AuthService) { }

  leaveForm = this.formBuilder.group({
    leaveType: ['', [Validators.required]],
    from: ['', [Validators.required]],
    to: ['', [Validators.required]],
    reason: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]]
  })

  leaveEndMinDate = "";

  handleFromChange(val: string) {
    this.leaveEndMinDate = val;

    if ((this.leaveForm?.value?.to ?? "") < val) {
      this.leaveForm.patchValue({
        to: ""
      })
    }

  }

  showError(controlName: string, errorName: string) {
    const control = this.leaveForm.get(controlName);

    return control?.invalid && (control.dirty || control.touched) && control.hasError(errorName);
  }

  onSubmit() {
    this.loading.set(true);

    this.http.post("http://localhost:8000/api/leave/apply", {
      empId: this.auth.currentUser?.id,
      managerId: this.auth.currentUser?.managerId,
      ...this.leaveForm.value
    })
      .subscribe({
        next: (res) => {
          this.loading.set(false);
          this.error.set(false);
          this.leaveForm.reset();
          this.isModalOpen.set(true);
        },
        error: (err) => {
          this.loading.set(false);
          this.error.set(true);
          this.isModalOpen.set(true);
        }
      })
  }
}
