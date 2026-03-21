import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Table, TableHeaderContentArea } from '../../../components/table/table';

@Component({
  selector: 'section[leave-balance]',
  imports: [FormsModule, Table, TableHeaderContentArea],
  templateUrl: './leave-balance.html',
  styleUrl: './leave-balance.scss',
})
export class LeaveBalance {
  leaveBalanceData = [
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
  ]
}
