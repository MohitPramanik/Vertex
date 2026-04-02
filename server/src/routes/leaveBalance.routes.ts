import { Router } from "express";
import { getLeaveBalance, updateLeaveBalance } from "../controllers/leaveBalance.controllers";

const leaveBalanceRouter = Router();

leaveBalanceRouter.route("/")
    .post(getLeaveBalance);

leaveBalanceRouter.route("/update")
    .post(updateLeaveBalance);

export default leaveBalanceRouter;