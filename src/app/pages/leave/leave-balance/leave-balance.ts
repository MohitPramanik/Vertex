import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Table, TableHeaderContentArea } from '../../../components/table/table';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth/auth-service';
import { ApiResponse } from '../../../interfaces/api';

interface ILeaveBalance {
  leaveType: string;
  balance: number;
}

@Component({
  selector: 'section[leave-balance]',
  imports: [FormsModule, Table],
  templateUrl: './leave-balance.html',
  styleUrl: './leave-balance.scss',
})

export class LeaveBalance implements OnInit {

  private auth = inject(AuthService);
  private http = inject(HttpClient);
  leaveBalanceData = signal<ILeaveBalance[]>([]);

  ngOnInit(): void {
    this.http.post<ApiResponse>("http://localhost:8000/api/leave/balance", {
      empId: this.auth.currentUser?.id
    }).subscribe(res => this.leaveBalanceData.set(res.data));
  }
}
