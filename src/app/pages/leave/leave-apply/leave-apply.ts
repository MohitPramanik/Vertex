import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

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
    leaveType: [''],
    from: [''],
    to: [''],
    reason: ['']
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

  onSubmit() {
    console.log(this.leaveForm.value);
  }
}
