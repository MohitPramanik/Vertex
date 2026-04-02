import { model, Schema, Types } from "mongoose";
import Employee from "./employee.model";
import { LeaveType, TLeaveType } from "../utils/constants";

export interface ILeaveBalance {
    empId: Types.ObjectId;
    leaves: {
        name: TLeaveType;
        balance: number;
    }[]
}

const leaveBalanceSchema = new Schema<ILeaveBalance>({
    empId: {
        type: Schema.Types.ObjectId,
        ref: Employee,
        required: true
    },
    leaves: [{
        name: {
            type: String,
            enum: LeaveType
        },
        balance: {
            type: Number,
            min: 0,
            default: 0
        },
        _id: false
    }]
})

const LeaveBalance = model<ILeaveBalance>("leaveBalance", leaveBalanceSchema);

export default LeaveBalance;