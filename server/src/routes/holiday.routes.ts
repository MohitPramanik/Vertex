import { Router } from "express";
import { getHolidays, upComingHolidays } from "../controllers/holiday.controller";

const holidayRouter = Router();

holidayRouter.route("/")
    .get(getHolidays);

holidayRouter.route("/upcoming")
    .get(upComingHolidays);

export default holidayRouter;

