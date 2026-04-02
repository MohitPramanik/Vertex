import { Request, Response } from "express";
import Department from "../models/department.model"
import asyncHandler from "../utils/asyncHandler";

export const getAllDepartment = asyncHandler(async (req: Request, res: Response) => {
    let departments = await Department.find();

    return res.json({
        status: "success",
        data: departments
    })
})

export const addDepartment = asyncHandler(async (req: Request, res: Response) => {
    let { name, head, openPositions, status } = req.body;

    await Department.create({
        name, head, openPositions, status
    })

    return res.json({
        status: "success",
        message: "Department added successfully"
    })
})