import { Router } from "express"
import { PrismaUserRepository } from "../repositories/PrismaUserRepository"
import { UserService } from "../services/UserService"
import { UserController } from "../controllers/UserController"


const repository = new PrismaUserRepository()
const service = new UserService(repository)
const controller = new UserController(service)

const userRouter = Router();

userRouter.post("/users", controller.create)
userRouter.get("/users", controller.listAll)
userRouter.get("/users/:id", controller.findById)
userRouter.put("/users/:id", controller.update)
userRouter.delete("/users/:id", controller.delete)

export default userRouter;