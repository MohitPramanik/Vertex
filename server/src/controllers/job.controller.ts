import { Request, Response } from "express";
import Job from "../models/job.model"
import asyncHandler from "../utils/asyncHandler";

export const getAllJobs = asyncHandler(async (req: Request, res: Response) => {
    const jobs = await Job.find().populate("department", "name").lean();

    return res.json({
        status: "success",
        data: jobs
    })
})

export const addNewJob = asyncHandler(async (req: Request, res: Response) => {
    const { title, department, location,
        employmentType, experienceRequiredInYears,
        salaryRange, requiredSkills, description, status } = req.body;

    let job = await Job.create({
        title, department, location,
        employmentType, experienceRequiredInYears,
        salaryRange, requiredSkills, description, status
    });

    return res.json({
        status: "success",
        message: "New Job added successfully"
    })
})