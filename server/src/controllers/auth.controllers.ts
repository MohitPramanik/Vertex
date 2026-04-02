import { Request, Response } from "express"
import User from "../models/user.model";
import { loginSchema, registerSchema } from "../validateSchema/authSchema";
import { validateSchema } from "../validateSchema/validateUtility";
import asyncHandler from "../utils/asyncHandler";
import Employee from "../models/employee.model";
import { TUserRole } from "../utils/constants";

interface LoginResponse {
    user: {
        id: string;
        username: string;
        email: string;
        role: TUserRole;
        managerId?: string;
    },
    accessToken: string,
}

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = await validateSchema(req.body, loginSchema);

    const user = await User.findOne({ email });

    if (!user || !(await user.validateToken(password, user.password))) {
        return res.status(400).json({
            status: "failed",
            message: "Invalid credentials"
        })
    }

    /* different logInUserId for candidate and company people because some of the details are present in user schema and 
    some are in employee schema so it's getting difficult to populate data in some situations in case of employees 
    such as while handling leave module where employeeId and employee username are required */
    let logInUserId = user._id;
    let managerId = "";

    if (user.role !== "candidate") {
        let employee = await Employee.findOne({ user: user._id })
        if (employee) {
            logInUserId = employee?._id.toString();
            managerId = employee.work.manager.toString();
        }
    }

    const responseBody: LoginResponse = {
        user: {
            id: logInUserId,
            username: user.username,
            email: user.email,
            role: user.role,
        },
        accessToken: user.generateToken(user),
    }

    // since candidate can't have manager and in employees managerId is required for various purposes like while applying for leave
    if (user.role !== "candidate") {
        responseBody.user.managerId = managerId
    }

    return res.status(200).json({
        status: "success",
        message: "User Logged in successfully",
        data: responseBody
    })
})


export const registerUser = asyncHandler(async (req: Request, res: Response) => {
    let { username, email, password, agreeTerms } = validateSchema(req.body, registerSchema);

    const user = await User.create({
        username, email, password, agreeTerms
    });

    if (user) {
        return res.send({
            status: "success",
            message: "User registered successfully"
        })
    }
})