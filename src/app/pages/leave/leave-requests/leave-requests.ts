import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Table } from '../../../components/table/table';

@Component({
  selector: 'section[leave-requests]',
  imports: [FormsModule, Table],
  templateUrl: './leave-requests.html',
  styleUrl: './leave-requests.scss',
})
export class LeaveRequests {
  leaveRequestData = [
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
    ]
}
