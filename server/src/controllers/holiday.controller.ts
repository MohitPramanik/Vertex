import { Request, Response } from "express";
import Holiday from "../models/holiday.model"
import asyncHandler from "../utils/asyncHandler";

interface Holiday {
    name: string,
    date: Date,
    description: string
}

let holidayFormat = {
    _id: 1,
    name: 1,
    date: {
        $dateToString: {
            format: "%Y-%m-%d",
            date: "$date"
        }
    },
    day: {
        $arrayElemAt: [
            ["", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            { $dayOfWeek: "$date" }
        ]
    },
    description: 1
};

export const getHolidays = asyncHandler(async (req: Request, res: Response) => {
    let holidays = await Holiday.aggregate([{ $project: holidayFormat }]);

    return res.json({
        status: "success",
        data: holidays
    })
})

export const upComingHolidays = asyncHandler(async (req: Request, res: Response) => {
    let today = new Date();
    let holidays = await Holiday.aggregate([
        {
            $match: {
                date: { $gte: today }
            }
        }, {
            $project: holidayFormat
        }
    ]).limit(4);

    return res.json({
        status: "success",
        data: holidays
    })
})


