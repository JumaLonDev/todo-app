import supertest from "supertest";
import { app } from "../app.js";

const request = supertest(app);

describe("Auth Endpoints", () => {
  test("POST /register - Registro exitoso", async () => {
    const uniqueEmail = `test-${Date.now()}@jest.com`;
    const res = await request
      .post("/api/auth/register")
      .send({ email: uniqueEmail, password: "password123" });
    expect(res.status).toBe(201);
  });

  test("POST /login - Login exitoso", async () => {
    // Primero registra un usuario
    const email = `test-${Date.now()}@jest.com`;
    await request
      .post("/api/auth/register")
      .send({ email, password: "password123" });

    // Ahora prueba login
    const res = await request
      .post("/api/auth/login")
      .send({ email, password: "password123" });
    expect(res.status).toBe(200);
  });
});
