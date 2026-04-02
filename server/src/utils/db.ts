import mongoose from "mongoose";
import { ExpressError } from "./ExpressError";

export const dbConnect = async () => {
    const url = process.env.MONGO_URI;

    if(!url) {
        throw new ExpressError();
    }
    try {
        if(url) {
            await mongoose.connect(url);
            console.log("DB connected successfully")
        }
    } catch (error) {
        console.log("Error connecting DB");
        throw new ExpressError();
    }
}