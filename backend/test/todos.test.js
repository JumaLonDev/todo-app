import { request } from "supertest";
import { app } from "../app.js";

describe("TODO Endpoints", () => {
  let authToken;
  let createdTodoId;

  beforeAll(async () => {
    // Registro inicial para obtener token
    const res = await request(app).post("/api/auth/register").send({
      email: "todo-test@jest.com",
      password: "password123",
    });
    authToken = res.body.token;
  });

  test("POST /todos - Debe crear un nuevo TODO", async () => {
    const res = await request(app)
      .post("/api/todos")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        title: "Test TODO",
        task: "Write integration tests",
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    createdTodoId = res.body.id;
  });

  test("GET /todos - Debe listar TODOs del usuario", async () => {
    const res = await request(app)
      .get("/api/todos")
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  test("DELETE /todos/:id - Debe eliminar un TODO", async () => {
    const res = await request(app)
      .delete(`/api/todos/${createdTodoId}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.statusCode).toEqual(204);
  });
});
