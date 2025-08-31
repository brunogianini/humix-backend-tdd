import { User } from "@prisma/client";
import { CriarUsuarioDTO } from "../dtos/CriaUsuarioDTO";
import { UserRepository } from "../repositories/UserRepository";

export class UserService {
    constructor(private userRepository: UserRepository) {}

    async criarUsuario(data: CriarUsuarioDTO): Promise<User>{
        if (!this.emailValido(data.email)) throw new Error("Este email é inválido")
        if (!this.senhaValida(data.senha)) throw new Error("Esta senha é fraca")

        const usuarioExiste = await this.userRepository.findByEmail(data.email)
        if(usuarioExiste) throw new Error("Este email já está cadastrado")
        
        return this.userRepository.create(data)
    }

    async listarUsuarios(): Promise<User[]>{
        return this.userRepository.findAll()
    }

    async buscaPorId(id: string): Promise<User | null>{
        const user = await this.userRepository.findById(id)
        return user
    }

        }
        if (data.email !== undefined) {
            const usuarioExiste = await this.userRepository.findByEmail(data.email);
            if (usuarioExiste && usuarioExiste.id !== id) {
                throw new Error("Este email já está cadastrado");
            }
        }
        const user = await this.userRepository.update(id, data)
        return user
    }

    async deletarUsuario(id: string): Promise<void>{
        return this.userRepository.delete(id)
    }

    private emailValido(email: string): boolean {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return regex.test(email)
    }

    private senhaValida(senha: string): boolean {
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/
        return regex.test(senha)
    }

}