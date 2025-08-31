import { Router } from "express";
import userRouter from "./UserRoutes";

const router = Router()

router.use(userRouter)

export default router
