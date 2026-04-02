
import { Router } from "express";
import authRouter from "./auth.routes";
import holidayRouter from "./holiday.routes";
import departmentRouter from "./department.routes";
import jobRouter from "./job.routes";
import employeeRouter from "./employee.routes";
import leaveRouter from "./leave.routes";
import leaveBalanceRouter from "./leaveBalance.routes";
import dashboardCardRouter from "./dashboard.routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/holiday", holidayRouter);
router.use("/department", departmentRouter);
router.use("/job", jobRouter);
router.use("/employee", employeeRouter);
router.use("/leave", leaveRouter);
router.use("/leave/balance", leaveBalanceRouter);
router.use("/dashboard", dashboardCardRouter)

export default router;