import { Router } from "express";
import { addEmployee, getAllEmployees } from "../controllers/employee.controller";

const employeeRouter: Router = Router();

employeeRouter.route("/")
    .get(getAllEmployees)
    .post(addEmployee);

export default employeeRouter;