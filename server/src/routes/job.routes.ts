import { Router } from "express";
import { addNewJob, getAllJobs } from "../controllers/job.controller";

const jobRouter = Router();

jobRouter.route("/")
    .get(getAllJobs)
    .post(addNewJob);


export default jobRouter;