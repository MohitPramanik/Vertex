import { Component, computed, inject, input, OnInit, Signal, signal } from '@angular/core';
import { Table } from '../../components/table/table';
import { UserRole } from '../../interfaces/user';
import { AuthService } from '../../services/auth/auth-service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../interfaces/api';
import { DashboardCard } from './dashboard-card';
import { CardDataSelection, DashboardCardApiResponse, Holiday, IDashBoardCard } from '../../interfaces/dashboard';


@Component({
  selector: 'div.app-dashboard',
  imports: [DashboardCard, Table],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})

export class Dashboard implements OnInit {

  private auth = inject(AuthService);
  private router = inject(Router);
  private http = inject(HttpClient);

  holidays = signal<Holiday[]>([]);
  leaveRequests = signal([]);
  role = signal<UserRole>("employee");
  cardDataSelection = signal<CardDataSelection>("self"); // role="employee" can't access this
  selfCardData = signal<IDashBoardCard[]>([]);
  organizationCardData = signal<IDashBoardCard[]>([]);

  fetchDashboardCardData() {
    this.http.post<DashboardCardApiResponse>("http://localhost:8000/api/dashboard", {
      empId: this.auth.currentUser?.id,
      role: this.auth.currentUser?.role
    })
      .subscribe(res => {
        this.selfCardData.set(res.data.self);
        this.organizationCardData.set(res.data.organization);
      })
  }

  fetchHolidayList() {
    this.http.get<ApiResponse>("http://localhost:8000/api/holiday/upcoming")
      .subscribe(res => this.holidays.set(res.data));
  }

  ngOnInit() {
    this.role.set(this.auth.getCurrentUser()?.role ?? "employee")
    this.fetchDashboardCardData();
    this.fetchHolidayList();
  }

  cardData: Signal<IDashBoardCard[]> = computed(() => {
    if (this.cardDataSelection() === "self") {
      return this.selfCardData();
    }
    else {
      return this.organizationCardData();
    }
  });


  // Last 4 system activity (for super admin);
  systemActivity = [
    { user: "Admin", action: "Created new department", date: "10 Mar 2026" },
    { user: "HR", action: "Added new employee", date: "12 Mar 2026" },
    { user: "Manager", action: "Updated team structure", date: "14 Mar 2026" },
    { user: "Admin", action: "Updated leave policy", date: "16 Mar 2026" }
  ];

  // Last 4 employee activity (for super admin);
  employeeActivity = [
    { employee: "Rahul Sharma", activity: "Joined Company", date: "12 Mar 2026" },
    { employee: "Priya Verma", activity: "Submitted Resignation", date: "15 Mar 2026" },
    { employee: "Amit Kumar", activity: "Promoted to Manager", date: "18 Mar 2026" },
    { employee: "Neha Singh", activity: "Transferred to Marketing", date: "20 Mar 2026" }
  ];

  // Recruitment overview for current year
  recruitmentOverview = [
    { role: "Frontend Developer", applicants: "32", interviewing: "6", selected: "1" },
    { role: "Backend Developer", applicants: "21", interviewing: "4", selected: "0" },
    { role: "UI/UX Designer", applicants: "15", interviewing: "3", selected: "1" },
    { role: "QA Engineer", applicants: "18", interviewing: "5", selected: "0" }
  ];

  navigateToUrl(url: string) {
    this.router.navigateByUrl(url);
  }
}
