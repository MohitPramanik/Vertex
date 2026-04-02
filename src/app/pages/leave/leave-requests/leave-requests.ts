import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Table } from '../../../components/table/table';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth/auth-service';
import { ApiResponse } from '../../../interfaces/api';

@Component({
  selector: 'section[leave-requests]',
  imports: [FormsModule, Table],
  templateUrl: './leave-requests.html',
  styleUrl: './leave-requests.scss',
})
export class LeaveRequests implements OnInit {

  private http = inject(HttpClient);
  private auth = inject(AuthService);
  leaveRequests = signal([]);
  role = this.auth.currentUser?.role;

  ngOnInit(): void {
    this.http.post<ApiResponse>("http://localhost:8000/api/leave", {
      empId: this.auth.currentUser?.id,
      role: "employee"
    }).subscribe(res => this.leaveRequests.set(res.data));
  }

}
