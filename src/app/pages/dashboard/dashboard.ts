import { Component, computed, inject, input, Signal, signal } from '@angular/core';
import { Table } from '../../components/table/table';
import { UserRole } from '../../interfaces/user';
import { AuthService } from '../../services/auth/auth-service';
import { Router } from '@angular/router';

interface DashBoardCard {
  title: string;
  data: string;
  subTitle?: string;
}

type CardDataSelection = "self" | "team";

interface Holidays {
  name: string;
  date: string;
}

@Component({
  selector: 'div.app-dashboard-card',
  imports: [],
  templateUrl: "./dashboard-card.html",
  styleUrl: './dashboard.scss',
})

export class DashboardCard {
  title = input<string>("Card Title");
  subTitle = input<string>('');
}

@Component({
  selector: 'div.app-dashboard',
  imports: [DashboardCard, Table],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

  private auth = inject(AuthService);
  private router = inject(Router);

  role = signal<UserRole>("employee");
  cardDataSelection = signal<CardDataSelection>("self"); // Only Managers, HRs and Admin can udpate


  constructor() {
    this.role.set(this.auth.getCurrentUser()?.role ?? "employee")
  }

  // for each employee including managers, hrs, ... as well
  employeeCardData: DashBoardCard[] = [
    { title: "Leave Balance", data: "42" },
    { title: "Pending Requests", data: "01" },
    { title: "Present Days", subTitle: "(This Month)", data: "10 / 22" },
    { title: "Leaves Taken", subTitle: "(This Year)", data: "04" },
  ]

  // for managers (organization card data - only his team)
  teamCardData: DashBoardCard[] = [
    { title: "Team size", data: "12" },
    { title: "Employees Present Today", data: "10" },
    { title: "Team Leave Request Pending", data: "02" },
    { title: "Upcoming Events", data: "01" },
  ]

  // for hrs (organization card data)
  hrCardData: DashBoardCard[] = [
    { title: "Total Employees", data: "124" },
    { title: "Open Job Positions", data: "05" },
    { title: "Candidates in Pipeline", data: "25" },
    { title: "Resignation Requests", data: "03" }
  ]

  // Leave data
  leaveData = [
    { leaveType: 'Sick Leave', date: '10 March 2026', status: 'Approved' },
    { leaveType: 'Casual Leave', date: '18 March 2026', status: 'Pending' },
    { leaveType: 'Annual Leave', date: '25 March 2026', status: 'Rejected' },
    { leaveType: 'Work From Home', date: '02 April 2026', status: 'Approved' }
  ];

  // for admin (organization card data)
  adminCardData: DashBoardCard[] = [
    { title: "Total Employees", data: "124" },
    { title: "Active Users", data: "118" },
    { title: "Departments", data: "08" },
    { title: "Open Job Positions", data: "05" }
  ];

  // for superadmin
  superAdminCardData = [
    { title: "Total Employees", data: "124" },
    { title: "Active Users", data: "118" },
    { title: "Departments", data: "08" },
    { title: "Open Job Positions", data: "05" }
  ];

  // Card data which changes according to role
  cardData: Signal<DashBoardCard[]> = computed(() => {
    if (
      (this.role() === "employee") ||
      (this.role() === "manager" && this.cardDataSelection() === "self") ||
      (this.role() === "hr" && this.cardDataSelection() === "self") ||
      (this.role() === "admin" && this.cardDataSelection() === "self")
    ) {
      return this.employeeCardData;
    }

    else if (this.role() === "manager" && this.cardDataSelection() === "team") {
      return this.teamCardData;
    }

    else if (this.role() === "hr" && this.cardDataSelection() === "team") {
      return this.hrCardData;
    }

    else if (this.role() === "admin" && this.cardDataSelection() === "team") {
      return this.adminCardData;
    }

    else {
      return this.superAdminCardData;
    }

  });

  // holiday list
  holidays: Holidays[] = [
    { name: 'Holi', date: '25 Mar 2026' },
    { name: 'Good Friday', date: '3 Apr 2026' },
    { name: 'Ram Navami', date: '6 Apr 2026' },
    { name: 'Independence Day', date: '15 Aug 2026' },
  ];

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
