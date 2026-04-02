import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import LeaveBalance, { ILeaveBalance } from "../models/leaveBalance.model";

export const getLeaveBalance = asyncHandler(async (req: Request, res: Response) => {
    let { empId } = req.body;

    let leaveBalance = await LeaveBalance.find({ empId }).lean();

    let modifiedLeaveBalance = leaveBalance[0]?.leaves.map((l) => {
        switch (l.name) {
            case "SL/CL":
                return { leaveType: "Sick / Casual Leave (SL/CL)", balance: l.balance };
            case "Comp":
                return { leaveType: "Compensatory Leave (Comp)", balance: l.balance };
            case "PL":
                return { leaveType: "Priviledge Leave (PL)", balance: l.balance };
            case "ML/PatL":
                return { leaveType: "Maternal / Paternal Leave(ML/PatL)", balance: l.balance };
            case "FL":
                return { leaveType: "Floating Leave(ML/PatL)", balance: l.balance };
            case "LWP":
                return { leaveType: "Leave without Pay(LWP)", balance: l.balance };
        }
    })

    return res.json({
        status: "success",
        data: modifiedLeaveBalance
    })
})


export const updateLeaveBalance = asyncHandler(async (req: Request, res: Response) => {
    let { empId, leaves } = req.body;

    let leaveBalance = await LeaveBalance.create({
        empId, leaves
    })

    return res.json({
        status: "success",
        message: "Leave Balance added successfully"
    })
})