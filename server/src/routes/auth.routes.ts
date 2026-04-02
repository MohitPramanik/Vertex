import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controllers";

const authRouter: Router = Router();

authRouter.route("/login")
        .post(loginUser);

authRouter.route("/register")
        .post(registerUser);

export default authRouter;