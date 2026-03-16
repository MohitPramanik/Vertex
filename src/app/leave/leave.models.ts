export type LeaveType = 'Annual' | 'Sick' | 'Casual' | 'Unpaid';

export type LeaveRequestStatus = 'Pending' | 'Approved' | 'Rejected' | 'Cancelled';

export interface EmployeeRef {
  id: string;
  name: string;
}

export interface LeaveRequest {
  id: string;
  employee: EmployeeRef;
  type: LeaveType;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  days: number;
  reason: string;
  status: LeaveRequestStatus;
  appliedAt: string; // ISO datetime
  decidedAt?: string; // ISO datetime
  decidedBy?: string;
}

export interface LeaveLedgerEntry {
  id: string;
  employee: EmployeeRef;
  type: LeaveType;
  entryDate: string; // ISO datetime
  description: string;
  deltaDays: number; // negative for usage, positive for credit
  balanceAfter?: number; // not applicable for Unpaid
  relatedRequestId?: string;
}

