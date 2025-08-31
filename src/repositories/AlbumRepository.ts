import { Album } from "@prisma/client";
import { CriarAlbumDTO } from "../dtos/CriarAlbumDTO";

export interface AlbumRepository {
  create(data: CriarAlbumDTO): Promise<Album>;
  findAll(): Promise<Album[]>;
  findById(id: string): Promise<Album | null>;
  findByName(id: string): Promise<Album | null>;
  darNota(id: string, data: Partial<CriarAlbumDTO>): Promise<Album>;
  delete(id: string): Promise<void>;
}