import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'section[leave-apply]',
  imports: [ReactiveFormsModule],
  templateUrl: './leave-apply.html',
  styleUrl: './leave-apply.scss',
})
export class LeaveApply {
  private formBuilder = inject(FormBuilder);

  leaveForm = this.formBuilder.group({
    empId: [''],
    leaveType: ['', [Validators.required]],
    from: ['', [Validators.required]],
    to: ['', [Validators.required]],
    reason: ['', [Validators.required, Validators.minLength(10)]]
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
    console.log(this.leaveForm.value);
  }
}
