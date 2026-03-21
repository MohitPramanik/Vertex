import { Routes } from '@angular/router';
import { authGuard } from './guards/auth/auth-guard';
import { autoLoginGuard } from './guards/autoLogin/auto-login-guard';
import { roleGuard } from './guards/role/role-guard';
import { MainLayout } from './layouts/main-layout/main-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { unsavedChangesGuard } from './guards/unsaved-changes/unsaved-changes-guard';

export const routes: Routes = [
    {
        path: "",
        component: MainLayout,
        canActivate: [authGuard],
        children: [
            {
                path: "",
                redirectTo: "dashboard",
                pathMatch: "full"
            },
            {
                path: "dashboard",
                loadComponent: () => import("./pages/dashboard/dashboard").then(m => m.Dashboard),
                title: "Vertex - Dashboard",
                data: { role: ["admin", "manager", "hr", "employee", "superAdmin"] }
            },
            {
                path: "employees",
                loadComponent: () => import("./pages/employees/employees").then(m => m.Employees),
                title: "Vertex - Employees",
                data: { role: ["admin", "manager", "hr", "employee", "superAdmin"] }
            },
            {
                path: "attendance",
                loadComponent: () => import("./pages/attendance/attendance").then(m => m.Attendance),
                title: "Vertex - Attendance",
                canDeactivate: [unsavedChangesGuard],
                data: { role: ["admin", "manager", "hr", "employee", "superAdmin"] },
                children: [
                    {
                        path: "records",
                        loadComponent: () => import("./pages/attendance-records/attendance-records").then(m => m.AttendanceRecords),
                        title: "Vertex - Attendance Records"
                    },
                ]
            },
            {
                path: "payslips",
                loadComponent: () => import("./pages/payslips/payslips").then(m => m.Payslips),
                title: "Vertex - Payslips",
                data: { role: ["admin", "manager", "hr", "employee", "superAdmin"] }
            },
            {
                path: "salary-structure",
                loadComponent: () => import("./pages/salary-structure/salary-structure").then(m => m.SalaryStructurePage),
                title: "Vertex - Salary Structure",
                data: { role: ["admin", "manager", "hr", "employee", "superAdmin"] }
            },
            {
                path: "holiday-list",
                loadComponent: () => import("./pages/holiday-calendar/holiday-calendar").then(m => m.HolidayCalendar),
                title: "Vertex - Holiday List",
                data: { role: ["admin", "manager", "hr", "employee", "superAdmin"] }
            },
            {
                path: "settings",
                loadComponent: () => import("./pages/settings/settings").then(m => m.Settings),
                title: "Vertex - Settings",
                data: { role: ["admin", "manager", "hr", "employee", "superAdmin"] },
                children: [
                    {
                        path: "",
                        loadComponent: () => import("./pages/settings/settings").then(m => m.GeneralSettings),
                    },
                    {
                        path: "security",
                        loadComponent: () => import("./pages/settings/settings").then(m => m.SecuritySettings),
                    }
                ]
            },
            {
                path: "notifications",
                loadComponent: () => import("./pages/notifications/notifications").then(m => m.Notifications),
                title: "Vertex - Notifications",
                data: { role: ["admin", "manager", "hr", "employee", "superAdmin"] }
            },
            {
                path: "company-setting",
                loadComponent: () => import("./pages/company-setting/company-setting").then(m => m.CompanySettingPage),
                title: "Vertex - Organization Settings",
                canDeactivate: [unsavedChangesGuard],
                data: { role: "superAdmin" }
            },
            {
                path: "profile",
                loadComponent: () => import("./pages/profile/profile").then(m => m.ProfilePage),
                title: "Vertex - Profile",
                data: { role: ["admin", "manager", "hr", "employee", "superAdmin"] }
            },
            {
                path: "leave",
                title: "Vertex - Leave",
                data: { role: ["admin", "manager", "hr", "employee", "superAdmin"] },
                children: [
                    {
                        path: "apply",
                        loadComponent: () => import("./pages/leave/leave-apply/leave-apply").then(m => m.LeaveApply),
                    },
                    {
                        path: "requests",
                        loadComponent: () => import("./pages/leave/leave-requests/leave-requests").then(m => m.LeaveRequests),
                    },
                    {
                        path: "balance",
                        loadComponent: () => import("./pages/leave/leave-balance/leave-balance").then(m => m.LeaveBalance),
                    },
                ]
            },
            {
                path: "recruitment",
                canActivateChild: [roleGuard],
                data: { role: ["admin", "hr", "superAdmin"] },
                children: [
                    {
                        path: "jobs",
                        loadComponent: () => import("./pages/jobs/jobs").then(m => m.Jobs),
                        title: "Vertex - Jobs List"
                    },
                    {
                        path: "candidates",
                        loadComponent: () => import("./pages/candidates/candidates").then(m => m.Candidates),
                        title: "Vertex - Candidates List"
                    }
                ]
            },
            {
                path: "departments",
                loadComponent: () => import("./pages/departments/departments").then(m => m.Departments),
                title: "Vertex - Departments",
                data: { role: "superAdmin" }
            },
            {
                path: "reports",
                loadComponent: () => import("./pages/reports/reports").then(m => m.Reports),
                title: "Vertex - Reports",
                data: { role: ["admin", "superAdmin"] }
            }
        ]
    },
    {
        path: "",
        component: AuthLayout,
        canActivate: [autoLoginGuard],
        children: [
            {
                path: "",
                redirectTo: "login",
                pathMatch: "full"
            },
            {
                path: "login",
                loadComponent: () => import("./pages/login/login").then(m => m.Login),
                title: "Vertex - Login",
            },
            {
                path: "signup",
                loadComponent: () => import("./pages/signup/signup").then(m => m.Signup),
                title: "Vertex - Signup",
            },
            {
                path: "password/reset",
                loadComponent: () => import("./pages/forgot-password-page/forgot-password-page").then(m => m.ForgotPasswordPage),
                title: "Vertex - Reset Password"
            },
        ]
    },
    {
        path: "**",
        loadComponent: () => import("./pages/not-found-page/not-found-page").then(m => m.NotFoundPage),
        title: "Vertex - 404 Not Found"
    }
];
