export type TUserRole = "candidate" | "employee" | "hr" | "manager" | "admin" | "superadmin";
export type TEmployementType = "fullTime"| "partTime" | "internship" | "contract";

/*
    SL/CL = Sick Leave / Casual Leave
    PL = Priviledge Leave
    Comp Off = Compensatory Off
    ML/PatL = Maternity Leave / Paternity Leave
    PL = Bereavement Leave (granted in case of death of a close family member)
    FL = Floating Leave
    LWP = Leave Without Pay
*/
export type TLeaveType = "SL/CL" | "PL" | "Comp" | "ML/PatL" | "FL" | "LWP"
export type TLeaveStatus = "approved" | "pending" | "rejected" | "withdrawn"

export const UserRole = ["candidate", "employee", "hr", "manager", "admin", "superadmin"];
export const EmploymentType = ["fullTime", "partTime", "internship", "contract"];

export const LeaveType = ["SL/CL", "PL", "Comp", "ML/PatL", "FL", "LWP"]
export const LeaveStatus = ["approved", "pending", "rejected", "withdrawn"]