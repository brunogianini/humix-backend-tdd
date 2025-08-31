import request from "supertest"
import app from "../src/app"
import { prisma } from "../src/utils/prisma"

beforeEach(async () => {
    await prisma.user.deleteMany()
})

describe("CRUD Usuário", () => {
    it("cria um usuário", async () => {
        const response = await request(app).post("/api/users").send({username: "Teste", email: "teste@gmail.com", senha: "Teste123!!!!!!!"})

        expect(response.status).toBe(201)
    })

    it("lista usuários", async () => {
        await request(app).post("/api/users").send({username: "Teste", email: "teste@gmail.com", senha: "Teste123!!!!!!!"})

        const response = await request(app).get("/api/users")
        expect(response.status).toBe(200)
        expect(response.body.length).toBeGreaterThan(0)
    })

    it("busca usuário por id", async () => {
        const created = await request(app).post("/api/users").send({
            username: "Teste",
            email: "teste@gmail.com",
            senha: "Teste123!!!!!!!"
        })

        const response = await request(app).get(`/api/users/${created.body.id}`);
        expect(response.status).toBe(200);
        expect(response.body.username).toBe("Teste")
    })

    it("atualiza usuário", async () => {
        const created = await request(app).post("/api/users").send({
            username: "Teste",
            email: "teste@gmail.com",
            senha: "Teste123!!!!!!!"
        });

        const response = await request(app)
        .put(`/api/users/${created.body.id}`)
        .send({ username: "Teste Updated" })

        expect(response.status).toBe(200);
        expect(response.body.username).toBe("Teste Updated")
    })

    it("deleta usuário", async () => {
        const created = await request(app).post("/api/users").send({
            username: "Teste",
            email: "teste@gmail.com",
            senha: "Teste123!!!!!!!"
        });

        const response = await request(app).delete(`/api/users/${created.body.id}`)
        expect(response.status).toBe(204);

        const check = await request(app).get(`/api/users/${created.body.id}`)
        expect(check.status).toBe(404)
    })
})