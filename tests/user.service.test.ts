import { UserService } from "../src/services/UserService";
import { PrismaUserRepository } from "../src/repositories/PrismaUserRepository";
import { CriarUsuarioDTO } from "../src/dtos/CriaUsuarioDTO";
import { prisma } from "../src/utils/prisma";

// const prisma = new PrismaClient()
let service: UserService

beforeEach(async () => {
  await prisma.user.deleteMany()
  const repository = new PrismaUserRepository()
  service = new UserService(repository)
})

describe("Validações do service com Prisma", () => {
  it("deve lançar erro ao criar usuário com email duplicado", async () => {
    const usuario: CriarUsuarioDTO = { username: "teste", email: "teste@gmail.com", senha: "Teste123!!!!!!!" }

    await service.criarUsuario(usuario)

    await expect(service.criarUsuario(usuario))
      .rejects
      .toThrow("Este email já está cadastrado")
  })

  it("deve lançar erro ao criar um usuário com um email inválido", async () => {
    const usuario: CriarUsuarioDTO = { username: "teste", email: "testegmail.com", senha: "Teste123!!!!!!!" }

    await expect(service.criarUsuario(usuario))
      .rejects
      .toThrow("Este email é inválido")
  })

  it("deve lançar erro ao criar um usuário com uma senha fraca", async () => {
    const usuario: CriarUsuarioDTO = { username: "teste", email: "teste@gmail.com", senha: "teste123" }

    await expect(service.criarUsuario(usuario))
      .rejects
      .toThrow("Esta senha é fraca")
  })
})