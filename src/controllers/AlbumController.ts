import { Request, Response } from "express";
import { AlbumService } from "../services/AlbumService";

export class AlbumController {
    constructor(private albumService: AlbumService) {}

    create = async (req: Request, res: Response) => {
        try {
            const user = await this.albumService.criarAlbum(req.body)
            return res.status(201).json(user)
        } catch(err: any){
            return res.status(400).json({erro: err.message})
        }
    }
}