import mongoose, { model, Schema } from "mongoose";
import Department from "./department.model";
import { EmploymentType, TEmployementType } from "../utils/constants";

interface IJob {
    title: string;
    department: object;
    location: string;
    employmentType: TEmployementType;
    experienceRequiredInYears: number;
    salaryRange: {
        min: number;
        max: number;
    },
    requiredSkills: string[];
    description: string;
    status: "open" | "closed" | "hold",
    openPositions: number;
    candidates: {
        applied: number;
        shortListed: number;
    }
}

const jobSchema = new Schema<IJob>({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Department,
        required: true
    },
    location: {
        type: String,
        default: "",
        trim: true
    },
    employmentType: {
        type: String,
        enum: EmploymentType,
        required: true,
        trim: true
    },
    experienceRequiredInYears: {
        type: Number,
        default: 0
    },
    salaryRange: {
        min: {
            type: Number,
            default: 0,
            min: 0
        },
        max: {
            type: Number,
            default: 0,
            min: 0
        }
    },
    requiredSkills: {
        type: [String],
        default: [],
        required: true
    },
    description: {
        type: String,
        min: 20,
        max: 1000,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ["open", "closed", "hold"],
        default: "open"
    },
    openPositions: {
        type: Number,
        min: 1,
        default: 1
    },
    candidates: {
        applied: {
            type: Number,
            min: 0,
            default: 0
        },
        shortListed: {
            type: Number,
            min: 0,
            default: 0
        }
    }
}, { timestamps: true })

const Job = model<IJob>("job", jobSchema);

export default Job;

