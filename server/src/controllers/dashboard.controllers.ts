import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import Employee from "../models/employee.model";
import { Types } from "mongoose";
import LeaveBalance from "../models/leaveBalance.model";
import Leave from "../models/leave.model";

type UserType = {
    _id: Types.ObjectId;
    role: string;
};

type Leave = {
    name: string;
    balance: number;
};

type LeaveBalanceType = {
    empId: Types.ObjectId;
    leaves: Leave[];
};

interface ICardData {
    title: string;
    data: number | string;
    subTitle?: string;
}


export const getDashboardCardData = asyncHandler(async (req: Request, res: Response) => {

    const { empId, role } = req.body;

    const leaveBalance = await LeaveBalance.findOne({ empId }).lean<LeaveBalanceType>();
    const leaveBalanceSum = leaveBalance?.leaves.reduce((sum, leave) => sum + leave.balance, 0);

    const startOfYear = new Date(new Date().getFullYear(), 0, 1);
    const endOfYear = new Date(new Date().getFullYear(), 11, 31);
    const approvedLeaves = await Leave.find({
        employee: empId,
        status: "approved",
        from: { $lte: endOfYear },
        to: { $gte: startOfYear }
    }).lean();

    const pendingLeaveRequests = await Leave.find({
        employee: empId,
        status: "pending"
    }).lean()


    const totalLeaveDays = approvedLeaves.reduce((total, leave) => {
        const from = new Date(leave.from);
        const to = new Date(leave.to);

        // Clamp within current year
        const effectiveFrom = from > startOfYear ? from : startOfYear;
        const effectiveTo = to < endOfYear ? to : endOfYear;

        // Calculate days (inclusive)
        const diffTime = effectiveTo.getTime() - effectiveFrom.getTime();
        const days = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

        return total + days;
    }, 0);

    let selfCardData: ICardData[] = [
        { title: "Leave Balance", data: leaveBalanceSum ?? 0 },
        { title: "Pending Requests", data: pendingLeaveRequests.length ?? 0 },
        { title: "Present Days", subTitle: "(This Month)", data: "10 / 22" },
        { title: "Leaves Taken", subTitle: "(This Year)", data: totalLeaveDays ?? 0 }
    ]

    let organizationCardData: ICardData[] = [];

    if (role === "superadmin") {
        organizationCardData = [
            { title: "Total Employees", data: "124" },
            { title: "Active Users", data: "118" },
            { title: "Departments", data: "08" },
            { title: "Open Job Positions", data: "05" }
        ]
    } else if (role === "manager") {
        organizationCardData = [
            { title: "Team size", data: 0 },
            { title: "Leave requested", subTitle: "Pending", data: "02" },
            { title: "Resignation Requests", data: "03" }
        ]
    } else if (role === "hr") {
        organizationCardData = [
            { title: "Total Employees", data: "124" },
            { title: "Open Job Positions", data: "05" },
            { title: "Candidates in Pipeline", data: "25" },
            { title: "Resignation Requests", data: "03" }
        ]
    } else if (role === "admin") {
        [
            { title: "Total Employees", data: "124" },
            { title: "Active Users", data: "118" },
            { title: "Departments", data: "08" },
            { title: "Open Job Positions", data: "05" }
        ];
    }

    return res.json({
        status: "success",
        data: {
            self: selfCardData,
            organization: organizationCardData
        }
    })

})