import { model, Schema, Types } from "mongoose";
import Employee from "./employee.model";
import User from "./user.model";
import { LeaveStatus, LeaveType, TLeaveStatus, TLeaveType } from "../utils/constants";

interface ILeave {
    employee: Types.ObjectId;
    leaveType: TLeaveType;
    from: Date;
    to: Date;
    reason: string;
    status: TLeaveStatus;
    manager: Types.ObjectId;
    createdAt?: Date;
}

const leaveSchema = new Schema<ILeave>({
    employee: {
        type: Schema.Types.ObjectId,
        ref: Employee, /* storing employee id because empId and username both are required in response */
        required: true
    },
    leaveType: {
        type: String,
        enum: LeaveType,
        required: true
    },
    from: {
        type: Date,
        required: true
    },
    to: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: LeaveStatus,
        default: "pending"
    },
    manager: {
        type: Schema.Types.ObjectId,
        ref: User, /* since manager basic details are in user schema */
        required: true
    }
}, {timestamps: true})

const Leave = model<ILeave>("leave", leaveSchema);

export default Leave;