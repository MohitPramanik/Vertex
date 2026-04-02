import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import Leave from "../models/leave.model";
import { Types } from "mongoose";
import dayjs from "dayjs";
import { ExpressError } from "../utils/ExpressError";

interface ILeaveFilter {
    manager?: Types.ObjectId;
    employee?: string;
}

export const getLeaveRequest = asyncHandler(async (req: Request, res: Response) => {

    const page = Number(req.query.page) ?? 1;
    const limit = Number(req.query.limit) ?? 10;

    const skip = (page - 1) * limit;

    const { managerId, empId, role } = req.body;

    let filter: ILeaveFilter = {};

    // if want to see own leave request then set role = "employee"
    // if want to see leave requests of employees under you then set set role = "manager"
    if (role === "employee") filter.employee = empId;
    else if (role === "manager") filter.manager = managerId;

    const leaveRequests =
        await Leave.find(filter)
            .skip(skip)
            .limit(limit)
            .populate({
                path: "employee",
                select: "-_id empId",
                populate: {
                    path: "user",
                    select: "-_id username"
                }
            })
            .lean();

    const formattedLeaves = leaveRequests.map(l => ({
        ...l,
        from: dayjs(l.from).format('YYYY-MM-DD'),
        to: dayjs(l.to).format('YYYY-MM-DD'),
        createdAt: dayjs(l.createdAt).format('YYYY-MM-DD')
    }));


    return res.json({
        status: "success",
        data: formattedLeaves
    })
})

export const applyLeaveRequest = asyncHandler(async (req: Request, res: Response) => {
    let { empId, managerId, leaveType, from, to, reason } = req.body;

    const leave = await Leave.create({
        employee: empId,
        manager: managerId,
        leaveType, from, to, reason
    })

    return res.json({
        status: "success",
        message: "Leave request applied successfully"
    })
})