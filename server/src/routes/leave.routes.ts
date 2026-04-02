import { Router } from "express";
import { applyLeaveRequest, getLeaveRequest } from "../controllers/leave.controllers";

const leaveRouter = Router();

leaveRouter.route("/")
    .post(getLeaveRequest);

leaveRouter.route("/apply")
    .post(applyLeaveRequest);

export default leaveRouter;