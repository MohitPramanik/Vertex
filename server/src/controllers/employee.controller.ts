import { Request, Response } from "express";
import Employee from "../models/employee.model";
import asyncHandler from "../utils/asyncHandler";

export const getAllEmployees = asyncHandler(async (req: Request, res: Response) => {
    let page = Number(req.query.page) ?? 1;
    let limit = Number(req.query.limit) ?? 10;

    let skip = (page - 1) * 10;

    let filter = {};

    // write filter functionality

    const employees =
        await Employee.find(filter)
            .skip(skip)
            .limit(limit)
            .populate([
                {path: "user", select: "username email"},
                {path: "work.manager", select: "username"}
            ])
            .lean();

    return res.json({
        status: "success",
        data: employees,
        totalCount: employees.length,
        filter
    })
})

export const addEmployee = asyncHandler(async (req: Request, res: Response) => {
    let { user, email, emp_id, phone, dob, address, profileImg, work } = req.body;

    let employee = new Employee({
        user,
        emp_id, phone, dob,
        address,
        profileImg,
        work
    })

    await employee.save();

    return res.json({
        status: "success",
        message: "Employee added successfully",
        employee
    })
})