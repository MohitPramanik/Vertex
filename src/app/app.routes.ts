import { Routes } from '@angular/router';
import { HolidayCalendar } from './holiday-calendar/holiday-calendar';
import { Payslips } from './payslips/payslips';
import { Dashboard } from './dashboard/dashboard';

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
        path: "payslips",
        component: Payslips
    },
    {
        path: "holiday-list",
        component: HolidayCalendar
    }
];
