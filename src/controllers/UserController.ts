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
            if (err.name === "NotFoundError" || err.message === "Usuário não encontrado") {
                return res.status(404).json({message: "Usuário não encontrado"});
            } else if (err.name === "ValidationError" || err.status === 400) {
                return res.status(400).json({message: err.message});
            } else {
                return res.status(500).json({message: "Erro interno do servidor"});
            }
        }
    }

    delete = async(req: Request, res:Response) => {
        const id: string = req.params.id
        try {
            await this.userService.deletarUsuario(id)
            return res.status(204).send()
            if (
                err?.message === "Usuário não encontrado" ||
                err?.code === "USER_NOT_FOUND"
            ) {
                return res.status(404).json({message: "Usuário não encontrado"});
            }
            // For other errors, return 400 (Bad Request) or 500 (Internal Server Error)
            return res.status(500).json({message: err.message || "Erro interno do servidor"});
        }
    }
}