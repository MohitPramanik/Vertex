import { Injectable, computed, signal } from '@angular/core';
import { LeaveLedgerEntry, LeaveRequest, LeaveRequestStatus, LeaveType } from './leave.models';
import { countWorkingDaysInclusive, isPaidLeaveType } from './leave.utils';

type LeaveBalances = Record<Exclude<LeaveType, 'Unpaid'>, number>;

interface LeaveStateV1 {
  version: 1;
  balances: LeaveBalances;
  requests: LeaveRequest[];
  ledger: LeaveLedgerEntry[];
}

const STORAGE_KEY = 'hr.leave.v1';

function nowIso(): string {
  return new Date().toISOString();
}

function randomId(prefix: string): string {
  return `${prefix}-${Math.random().toString(16).slice(2, 8)}-${Date.now().toString(16)}`;
}

function safeReadState(): LeaveStateV1 | null {
  try {
    if (typeof window === 'undefined') return null;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as LeaveStateV1;
    if (!parsed || parsed.version !== 1) return null;
    if (!parsed.balances || !parsed.requests || !parsed.ledger) return null;
    return parsed;
  } catch {
    return null;
  }
}

function safeWriteState(state: LeaveStateV1) {
  try {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

function seedState(): LeaveStateV1 {
  return {
    version: 1,
    balances: { Annual: 12, Sick: 8, Casual: 6 },
    requests: [
      {
        id: 'LR-1001',
        employee: { id: 'EMP001', name: 'John Doe' },
        type: 'Annual',
        startDate: '2026-03-10',
        endDate: '2026-03-11',
        days: 2,
        reason: 'Family event',
        status: 'Approved',
        appliedAt: '2026-03-07T09:10:00.000Z',
        decidedAt: '2026-03-08T06:20:00.000Z',
        decidedBy: 'Manager',
      },
      {
        id: 'LR-1002',
        employee: { id: 'EMP001', name: 'John Doe' },
        type: 'Sick',
        startDate: '2026-03-14',
        endDate: '2026-03-14',
        days: 1,
        reason: 'Fever',
        status: 'Pending',
        appliedAt: '2026-03-13T08:00:00.000Z',
      },
    ],
    ledger: [
      {
        id: 'LL-2001',
        employee: { id: 'EMP001', name: 'John Doe' },
        type: 'Annual',
        entryDate: '2026-03-08T06:20:00.000Z',
        description: 'Approved leave (LR-1001)',
        deltaDays: -2,
        balanceAfter: 10,
        relatedRequestId: 'LR-1001',
      },
    ],
  };
}

@Injectable({ providedIn: 'root' })
export class LeaveStore {
  readonly currentEmployee = signal({ id: 'EMP001', name: 'John Doe' });

  private readonly _state = signal<LeaveStateV1>(safeReadState() ?? seedState());

  readonly requests = computed(() => this._state().requests.slice().sort((a, b) => b.appliedAt.localeCompare(a.appliedAt)));
  readonly ledger = computed(() => this._state().ledger.slice().sort((a, b) => b.entryDate.localeCompare(a.entryDate)));
  readonly balances = computed(() => this._state().balances);

  readonly pendingCount = computed(() => this._state().requests.filter((r) => r.status === 'Pending').length);

  private commit(updater: (state: LeaveStateV1) => LeaveStateV1) {
    const next = updater(this._state());
    this._state.set(next);
    safeWriteState(next);
  }

  calculateDays(startDate: string, endDate: string): number | null {
    return countWorkingDaysInclusive(startDate, endDate);
  }

  applyLeave(input: { type: LeaveType; startDate: string; endDate: string; reason: string }) {
    const days = this.calculateDays(input.startDate, input.endDate);
    if (days === null) return { ok: false as const, error: 'Invalid date range.' };
    if (days <= 0) return { ok: false as const, error: 'Selected dates contain no working days.' };

    if (isPaidLeaveType(input.type)) {
      const balance = this._state().balances[input.type];
      if (days > balance) return { ok: false as const, error: `Insufficient ${input.type} balance.` };
    }

    const employee = this.currentEmployee();
    const request: LeaveRequest = {
      id: randomId('LR'),
      employee,
      type: input.type,
      startDate: input.startDate,
      endDate: input.endDate,
      days,
      reason: input.reason,
      status: 'Pending',
      appliedAt: nowIso(),
    };

    this.commit((s) => ({ ...s, requests: [request, ...s.requests] }));
    return { ok: true as const, request };
  }

  setRequestStatus(requestId: string, status: LeaveRequestStatus, decidedBy: string) {
    this.commit((s) => {
      const idx = s.requests.findIndex((r) => r.id === requestId);
      if (idx < 0) return s;
      const current = s.requests[idx];
      if (current.status !== 'Pending') return s;

      const decidedAt = nowIso();
      const updated: LeaveRequest = { ...current, status, decidedAt, decidedBy };
      const nextRequests = s.requests.slice();
      nextRequests[idx] = updated;

      if (status !== 'Approved' || !isPaidLeaveType(updated.type)) {
        return { ...s, requests: nextRequests };
      }

      const currentBalance = s.balances[updated.type];
      const nextBalance = Math.max(0, currentBalance - updated.days);

      const entry: LeaveLedgerEntry = {
        id: randomId('LL'),
        employee: updated.employee,
        type: updated.type,
        entryDate: decidedAt,
        description: `Approved leave (${updated.id})`,
        deltaDays: -updated.days,
        balanceAfter: nextBalance,
        relatedRequestId: updated.id,
      };

      return {
        ...s,
        requests: nextRequests,
        balances: { ...s.balances, [updated.type]: nextBalance },
        ledger: [entry, ...s.ledger],
      };
    });
  }

  approveRequest(requestId: string) {
    this.setRequestStatus(requestId, 'Approved', 'Manager');
  }

  rejectRequest(requestId: string) {
    this.setRequestStatus(requestId, 'Rejected', 'Manager');
  }

  cancelRequest(requestId: string) {
    this.commit((s) => {
      const idx = s.requests.findIndex((r) => r.id === requestId);
      if (idx < 0) return s;
      const current = s.requests[idx];
      if (current.status !== 'Pending') return s;
      if (current.employee.id !== this.currentEmployee().id) return s;
      const nextRequests = s.requests.slice();
      nextRequests[idx] = { ...current, status: 'Cancelled', decidedAt: nowIso(), decidedBy: 'Self' };
      return { ...s, requests: nextRequests };
    });
  }
}

