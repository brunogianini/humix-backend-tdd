import { Router } from "express"
import { PrismaAlbumRepository } from "../repositories/PrismaAlbumRepository";
import { AlbumService } from "../services/AlbumService";
import { AlbumController } from "../controllers/AlbumController";

const repository = new PrismaAlbumRepository()
const service = new AlbumService(repository)
const controller = new AlbumController(service)

const albumRouter = Router();

albumRouter.post("/albums", controller.create)

export default albumRouter;