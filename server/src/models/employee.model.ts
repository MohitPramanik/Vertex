import { model, Schema, Types } from "mongoose";
import { EmploymentType, UserRole } from "../utils/constants";
import User from "./user.model";
import Department from "./department.model";

interface IEmployee {
    user: Types.ObjectId;
    empId: string;
    phone: string;
    dob: string;
    address: {
        street: string;
        city: string;
        state: string;
        pinCode: string;
    };
    profileImg: string;
    work: {
        doj: string;
        designation: string;
        location: string;
        shift: string;
        mode: string;
        department: Types.ObjectId;
        currentProject: string;
        manager: Types.ObjectId;
        workStatus: string;
        employmentType: string;
    }
}

const employeeSchema = new Schema<IEmployee>({
    user: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true,
        unique: true
    },
    empId: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    dob: {
        type: String,
        required: true
    },
    address: {
        street: {
            type: String,
            default: ""
        },
        city: {
            type: String,
            default: ""
        },
        state: {
            type: String,
            default: ""
        },
        pinCode: {
            type: String,
            default: ""
        },
    },
    profileImg: {
        type: String,
        default: ""
    },
    work: {
        doj: {
            type: String,
            required: true
        },
        designation: {
            type: String,
            required: true,
            trim: true
        },
        location: {
            type: String,
            trim: true
        },
        shift: {
            type: String,
            enum: ["regular", "night", "rotational"]
        },
        mode: {
            type: String,
            enum: ["onsite", "remote", "hybrid"]
        },
        department: {
            type: Schema.Types.ObjectId,
            ref: Department,
            required: true
        },
        currentProject: {
            type: String,
        },
        manager: {
            type: Schema.Types.ObjectId,
            ref: User
        },
        workStatus: {
            type: String,
            enum: ["active", "inactive"]
        },
        employmentType: {
            type: String,
            enum: EmploymentType
        }
    }
})

const Employee = model<IEmployee>("employee", employeeSchema);

export default Employee;