import { model, Schema } from "mongoose";

interface IDepartment {
    name: string;
    head: string,
    openPositions: number;
    employeesCount: number;
    status: "active" | "inactive"
}

const departmentSchema = new Schema<IDepartment>({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: [true, "Department already exists"]
    },
    head: {
        type: String,
        required: true,
        trim: true,
        unique: [true, "Already a head of other department"]
    },
    openPositions: {
        type: Number,
        min: 0,
        default: 0
    },
    employeesCount: {
        type: Number,
        min: 0,
        default: 0
    },
    status: {
        type: String,
        default: "active",
        enum: ["active", "inactive"]
    }
})

const Department = model<IDepartment>("department", departmentSchema);

export default Department;