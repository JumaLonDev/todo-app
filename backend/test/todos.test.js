import supertest from "supertest";
import { app } from "../app.js";

const request = supertest(app);

describe("TODO Endpoints", () => {
  let authToken;
  let createdTodoId;

  beforeAll(async () => {
    const uniqueEmail = `todo-test-${Date.now()}@jest.com`; // unique email for testing
    const registerRes = await request
      .post("/api/auth/register")
      .send({ email: uniqueEmail, password: "password123" });

    authToken = registerRes.body.token;
  });

  afterAll(async () => {
    if (createdTodoId) {
      await request
        .delete(`/api/todos/${createdTodoId}`)
        .set("Authorization", `Bearer ${authToken}`);
    }
  });

  test("POST /todos - Create new TODO", async () => {
    const res = await request
      .post("/api/todos")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        title: "Test TODO",
        task: "Write tests",
        completa: false,
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
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
