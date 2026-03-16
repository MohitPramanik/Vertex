import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LeaveLedgerEntry, LeaveType } from '../leave/leave.models';
import { LeaveStore } from '../leave/leave.store';

@Component({
  selector: 'section[leave-balance]',
  imports: [RouterLink, FormsModule],
  templateUrl: './leave-balance.html',
  styleUrl: './leave-balance.scss',
  host: { class: 'max-w-[68rem] m-auto p-5' },
})
export class LeaveBalance {
  readonly leaveStore = inject(LeaveStore);

  readonly ledgerTypeFilter = signal<LeaveType | 'All'>('All');

  get ledgerTypeFilterValue() {
    return this.ledgerTypeFilter();
  }
  set ledgerTypeFilterValue(v: LeaveType | 'All') {
    this.ledgerTypeFilter.set(v);
  }

  readonly ledger = computed<LeaveLedgerEntry[]>(() => {
    const type = this.ledgerTypeFilter();
    const entries = this.leaveStore.ledger();
    if (type === 'All') return entries;
    return entries.filter((e) => e.type === type);
  });

  readonly leaveTypes: (LeaveType | 'All')[] = ['All', 'Annual', 'Sick', 'Casual', 'Unpaid'];
}
