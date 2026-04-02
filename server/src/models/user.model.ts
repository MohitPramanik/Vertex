import { Model, model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { TUserRole, UserRole } from "../utils/constants";


interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
    role: TUserRole;
    agreeTerms: boolean;
}

interface UserMethods {
    generateToken: (user: User) => string;
    validateToken: (password: string, hashPassword: string) => Promise<boolean>
}

type UserModel = Model<User, {}, UserMethods>;

const userSchema = new Schema<User, UserModel, UserMethods>({
    username: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, "User already exist"],
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "candidate",
        enum: UserRole
    },
    agreeTerms: {
        type: Boolean,
        required: true
    }
}, {timestamps: true});

userSchema.pre('save', async function() {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
})

userSchema.methods.generateToken = function(user: User) {
    const privateKey = "Mohit";

    return jwt.sign({
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
    }, privateKey, {algorithm: "HS256", expiresIn: '7d'});
}

userSchema.methods.validateToken = async function(password: string, hashPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
}

const User = model<User, UserModel>("user", userSchema);

export default User;
