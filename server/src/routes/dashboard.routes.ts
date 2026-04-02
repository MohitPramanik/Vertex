import { Router } from "express";
import { getDashboardCardData } from "../controllers/dashboard.controllers";

const dashboardCardRouter = Router();

dashboardCardRouter.route("/")
    .post(getDashboardCardData)

export default dashboardCardRouter;