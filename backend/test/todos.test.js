import supertest from "supertest";
import { app } from "../app.js";
const request = supertest(app);

describe("TODO Endpoints", () => {
  let authToken;
  let createdTodoId;

  beforeAll(async () => {
    // Registro inicial para obtener token
    const registerRes = await request
      .post("/api/auth/register")
      .send({ email: "todo-test@jest.com", password: "password123" });

    authToken = registerRes.body.token;
  });

  test("POST /todos - Crear nuevo TODO", async () => {
    const res = await request
      .post("/api/todos")
      .set("Authorization", `Bearer ${authToken}`)
      .send({ title: "Test TODO", task: "Write tests" });

    expect(res.status).toBe(201);
    createdTodoId = res.body.id;
  });

  test("GET /todos - Listar TODOs", async () => {
    const res = await request
      .get("/api/todos")
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});
