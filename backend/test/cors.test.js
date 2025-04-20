import supertest from "supertest";
import { app } from "../app.js";

const request = supertest(app);

test("Debería bloquear dominios no permitidos", async () => {
  const res = await request
    .get("/api/todos")
    .set("Origin", "http://dominio-malicioso.com");

  expect(res.status).toBe(403);
});
