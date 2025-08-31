import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
    constructor(private userService: UserService) {}

    create = async (req: Request, res: Response) => {
        try {
            const user = await this.userService.criarUsuario(req.body)
            return res.status(201).json(user)
        } catch(err: any){
            return res.status(400).json({erro: err.message})
        }
    }

    listAll = async(req: Request, res: Response) => {
        const users = await this.userService.listarUsuarios()
        return res.status(200).json(users)
    }

    findById = async(req: Request, res: Response) => {
        const id: string = req.params.id
        const user = await this.userService.buscaPorId(id)
        if (!user) {
            return res.status(404).json({message: "Usuário não encontrado"})
        }
        return res.status(200).json(user)
    }

    update = async(req: Request, res:Response) => {
        const id: string = req.params.id
        try{
            const user = await this.userService.atualizarUsuario(id, req.body)
            return res.status(200).json(user)
        }catch (err: any){
            return res.status(404).json({message: "Usuário não encontrado"})
        }
    }

    delete = async(req: Request, res:Response) => {
        const id: string = req.params.id

        try{
            await this.userService.deletarUsuario(id)
            return res.status(204).send()
        } catch (err: any) {
            return res.status(404).json({message: "Usuário não encontrado"})
        }
    }
}