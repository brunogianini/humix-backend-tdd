import { User } from "@prisma/client";
import { prisma } from "../utils/prisma";
import { UserRepository } from "./UserRepository";
import { CriarUsuarioDTO } from "../dtos/CriaUsuarioDTO";

export class PrismaUserRepository implements UserRepository{
    async create(data: CriarUsuarioDTO): Promise<User>{
        return prisma.user.create({ data })
    }

    async findByEmail(email: string): Promise<User | null>{
        return prisma.user.findUnique({ where: {email}})
    }

    async findAll(): Promise<User[]>{
        return prisma.user.findMany()
    }

    async findById(id: string): Promise<User | null>{
        return prisma.user.findUnique({ where: {id}})
    }

    async update(id: string, data: Partial<CriarUsuarioDTO>): Promise<User>{
        return prisma.user.update({where: {id}, data})
    }

    async delete(id: string): Promise<void>{
        await prisma.user.delete({where: {id}})
    }
}