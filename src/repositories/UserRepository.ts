import { User } from "@prisma/client";
import { CriarUsuarioDTO } from "../dtos/CriaUsuarioDTO";

export interface UserRepository {
  create(data: CriarUsuarioDTO): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  update(id: string, data: Partial<CriarUsuarioDTO>): Promise<User>;
  delete(id: string): Promise<void>;
}