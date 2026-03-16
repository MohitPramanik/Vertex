import { Routes } from '@angular/router';
import { HolidayCalendar } from './holiday-calendar/holiday-calendar';
import { Payslips } from './payslips/payslips';
import { Dashboard } from './dashboard/dashboard';
import { Employees } from './employees/employees';
import { Attendance } from './attendance/attendance';
import { LeaveApply } from './leave-apply/leave-apply';
import { LeaveRequests } from './leave-requests/leave-requests';
import { LeaveBalance } from './leave-balance/leave-balance';
import { AttendanceRecords } from './attendance-records/attendance-records';
import { SalaryStructurePage } from './salary-structure/salary-structure';
import { ProfilePage } from './profile/profile';
import { SettingsPage } from './settings/settings';
import { CompanySettingPage } from './company-setting/company-setting';
import { UserManagePage } from './user-manage/user-manage';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full"
    },
    {
        path: "dashboard",
        component: Dashboard
    },
    {
        path: "employees",
        component: Employees
    },
    {
        path: "attendance",
        component: Attendance
    },
    {
        path: "attendance/records",
        component: AttendanceRecords
    },
    {
        path: "payslips",
        component: Payslips
    },
    {
        path: "salary-structure",
        component: SalaryStructurePage
    },
    {
        path: "holiday-list",
        component: HolidayCalendar
    },
    {
        path: "settings",
        component: SettingsPage
    },
    {
        path: "company-setting",
        component: CompanySettingPage
    },
    {
        path: "user/manage",
        component: UserManagePage
    },
    {
        path: "profile",
        component: ProfilePage
    },
    {
        path: "leave",
        redirectTo: "leave/balance",
        pathMatch: "full"
    },
    {
        path: "leave/apply",
        component: LeaveApply
    },
    {
        path: "leave/requests",
        component: LeaveRequests
    },
    {
        path: "leave/balance",
        component: LeaveBalance
    }
];
