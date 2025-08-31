import request from "supertest"
import app from "../src/app"
import { prisma } from "../src/utils/prisma"

beforeEach(async () => {
    await prisma.user.deleteMany()
})

describe("CRUD Álbum", () => {
    it("cria um álbum", async () => {
        const response = await request(app).post("/api/albums").send({nome: "Ants from up there", banda: "Black country new road"})
        expect(response.status).toBe(201)
    })
})