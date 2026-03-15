import { Component, computed, effect, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface sidebarOptionsType {
  title: string;
  path?: string;
  icon?: string;
  children?: {
    title: string;
    path: string;
  }[]
}

@Component({
  selector: '[app-sidebar]',
  imports: [RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {

  role = signal<string>("Admin");
  isSidebarOpen = signal<boolean>(true);

  SIDEBAR_KEYS = {
    DASHBOARD: "Dashboard",
    EMPLOYEES: "Employees",
    ATTENDANCE: "Attendance",
    LEAVE: "Leave Ledger",
    PAYROLL: "Payroll",
    RECRUITMENT: "Recruitment",
    DEPARTMENTS: "Departments",
    ROLES: "User Access",
    REPORTS: "Reports",
    SETTINGS: "System Settings",
    HOLIDAY: "Holiday Calendar"
  };


  // Admin will have all the options present
  employeeAccess = [
    this.SIDEBAR_KEYS.DASHBOARD,
    this.SIDEBAR_KEYS.EMPLOYEES,
    this.SIDEBAR_KEYS.ATTENDANCE,
    this.SIDEBAR_KEYS.LEAVE,
    this.SIDEBAR_KEYS.PAYROLL,
    this.SIDEBAR_KEYS.HOLIDAY
  ];

  hrAccess = [
    this.SIDEBAR_KEYS.DASHBOARD,
    this.SIDEBAR_KEYS.EMPLOYEES,
    this.SIDEBAR_KEYS.ATTENDANCE,
    this.SIDEBAR_KEYS.LEAVE,
    this.SIDEBAR_KEYS.PAYROLL,
    this.SIDEBAR_KEYS.RECRUITMENT,
    this.SIDEBAR_KEYS.DEPARTMENTS,
    this.SIDEBAR_KEYS.REPORTS,
    this.SIDEBAR_KEYS.HOLIDAY
  ];

  managerAccess = [
    this.SIDEBAR_KEYS.DASHBOARD,
    this.SIDEBAR_KEYS.EMPLOYEES,
    this.SIDEBAR_KEYS.ATTENDANCE,
    this.SIDEBAR_KEYS.LEAVE,
    this.SIDEBAR_KEYS.REPORTS,
    this.SIDEBAR_KEYS.HOLIDAY
  ];

  sidebarOptions: sidebarOptionsType[] = [
    { title: this.SIDEBAR_KEYS.DASHBOARD, path: "/dashboard", icon: "fa-chart-area" },
    { title: this.SIDEBAR_KEYS.EMPLOYEES, path: "/employees", icon: "fa-people-line" },
    {
      title: this.SIDEBAR_KEYS.ATTENDANCE,
      icon: "fa-address-book",
      children: [
        { title: "Mark Attendance", path: "/attendance" },
        { title: "Attendance Records", path: "/attendance/records" }
      ],
    },
    {
      title: this.SIDEBAR_KEYS.LEAVE,
      icon: "fa-lemon",
      children: [
        { title: "Apply Leave", path: "/leave/apply" },
        { title: "Leave Requests", path: "/leave/requests" },
        { title: "Leave Balance", path: "/leave/balance" },
      ],
    },
    {
      title: this.SIDEBAR_KEYS.PAYROLL,
      icon: "fa-money-bill",
      children: [
        { title: "Payslips", path: "/payslips" },
        { title: "Salary Structure", path: "/salary-structure" },
      ],
    },
    {
      title: this.SIDEBAR_KEYS.RECRUITMENT,
      icon: "fa-briefcase",
      children: [
        { title: "Jobs", path: "/jobs" },
        { title: "Candidates", path: "/candidates" },
      ],
    },
    { title: this.SIDEBAR_KEYS.DEPARTMENTS, path: "/departments", icon: "fa-building" },
    { title: this.SIDEBAR_KEYS.ROLES, path: "/roles/permissions", icon: "fa-user" },
    { title: this.SIDEBAR_KEYS.REPORTS, path: "/reports", icon: "fa-arrow-trend-up" },
    {
      title: this.SIDEBAR_KEYS.SETTINGS,
      icon: "fa-gear",
      children: [
        { title: "Company Settings", path: "/company-setting" },
        { title: "User Management", path: "/user/manage" }
      ],
    },
    { title: this.SIDEBAR_KEYS.HOLIDAY, path: "/holiday-list", icon: "fa-snowflake" }
  ]

  filteredOptions = computed(() => {
    if (this.role() === "Manager") {
      return this.sidebarOptions.filter((item) => this.managerAccess.includes(item.title))
    }
    else if (this.role() === "Employee") {
      return this.sidebarOptions.filter((item) => this.employeeAccess.includes(item.title))
    }
    else if (this.role() === "HR") {
      return this.sidebarOptions.filter((item) => this.hrAccess.includes(item.title))
    }
    else if (this.role() === "Admin") {
      return this.sidebarOptions
    }
    else {
      return [];
    }
  })

  constructor() {
    effect(() => {
      console.log(this.isSidebarOpen())

    })
  }

  toggleSidebar() {
    this.isSidebarOpen.update(v => !v)
  }




}
