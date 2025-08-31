import { Router } from "express";
import userRouter from "./UserRoutes";
import albumRouter from "./AlbumRoutes";

const router = Router()

router.use(userRouter)
router.use(albumRouter)

export default router
