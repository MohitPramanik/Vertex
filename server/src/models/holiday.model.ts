import { model, Schema } from "mongoose";

const holidaySchema = new Schema({
    name: String,
    day: String,
    date: Date,
    description: String
})

const Holiday = model("holiday", holidaySchema);

export default Holiday;