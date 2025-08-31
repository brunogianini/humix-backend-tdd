import { Album } from "@prisma/client";
import { CriarAlbumDTO } from "../dtos/CriarAlbumDTO";
import { prisma } from "../utils/prisma";
import { AlbumRepository } from "./AlbumRepository";

export class PrismaAlbumRepository implements AlbumRepository{
    async create(data: CriarAlbumDTO): Promise<Album>{
        return prisma.album.create({ data })
    }

    async findAll(): Promise<Album[]>{
        return prisma.album.findMany()
    }

    async findById(id: string): Promise<Album | null>{
        return prisma.album.findUnique({ where: {id}})
    }

    async darNota(id: string, data: Partial<CriarAlbumDTO>): Promise<Album>{
        return prisma.album.update({where: {id}, data})
    }

    async delete(id: string): Promise<void>{
        await prisma.album.delete({where: {id}})
    }

    async findByName(nome: string): Promise<Album | null>{
        return prisma.album.findFirst({ where: {nome}})
    }
}