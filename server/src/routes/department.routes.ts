import { Router } from "express";
import { addDepartment, getAllDepartment } from "../controllers/department.controller";

const departmentRouter = Router();

departmentRouter.route("/")
    .get(getAllDepartment)
    .post(addDepartment)

export default departmentRouter;