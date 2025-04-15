import { request } from "supertest";
import { app } from "../app.js";

describe("Auth Endpoints", () => {
  let authToken;

  test("POST /register - Debe registrar un nuevo usuario", async () => {
    const res = await request(app).post("/api/auth/register").send({
      email: "test@jest.com",
      password: "password123",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("token");
    authToken = res.body.token;
  });

  test("POST /login - Debe loguear al usuario registrado", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "test@jest.com",
      password: "password123",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });
});
