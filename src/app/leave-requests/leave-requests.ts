import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LeaveRequestStatus, LeaveType } from '../leave/leave.models';
import { LeaveStore } from '../leave/leave.store';

@Component({
  selector: 'section[leave-requests]',
  imports: [RouterLink, FormsModule],
  templateUrl: './leave-requests.html',
  styleUrl: './leave-requests.scss',
  host: { class: 'max-w-[68rem] m-auto p-5' },
})
export class LeaveRequests {
  readonly leaveStore = inject(LeaveStore);

  readonly typeFilter = signal<LeaveType | 'All'>('All');
  readonly statusFilter = signal<LeaveRequestStatus | 'All'>('All');
  readonly query = signal<string>('');

  get queryValue() {
    return this.query();
  }
  set queryValue(v: string) {
    this.query.set(v);
  }

  get typeFilterValue() {
    return this.typeFilter();
  }
  set typeFilterValue(v: LeaveType | 'All') {
    this.typeFilter.set(v);
  }

  get statusFilterValue() {
    return this.statusFilter();
  }
  set statusFilterValue(v: LeaveRequestStatus | 'All') {
    this.statusFilter.set(v);
  }

  readonly filteredRequests = computed(() => {
    const type = this.typeFilter();
    const status = this.statusFilter();
    const q = this.query().trim().toLowerCase();
    return this.leaveStore.requests().filter((r) => {
      if (type !== 'All' && r.type !== type) return false;
      if (status !== 'All' && r.status !== status) return false;
      if (!q) return true;
      return (
        r.id.toLowerCase().includes(q) ||
        r.employee.id.toLowerCase().includes(q) ||
        r.employee.name.toLowerCase().includes(q)
      );
    });
  });

  readonly leaveTypes: (LeaveType | 'All')[] = ['All', 'Annual', 'Sick', 'Casual', 'Unpaid'];
  readonly statusTypes: (LeaveRequestStatus | 'All')[] = ['All', 'Pending', 'Approved', 'Rejected', 'Cancelled'];

  approve(id: string) {
    this.leaveStore.approveRequest(id);
  }

  reject(id: string) {
    this.leaveStore.rejectRequest(id);
  }

  cancel(id: string) {
    this.leaveStore.cancelRequest(id);
  }
}
