import "dotenv/config";
import express from "express";
import corsMiddleware from "./middleware/cors.js";
import securityMiddleware from "./middleware/security.js";
import { initDB } from "./config/db.config.js";
import User from "./models/User.js";
import Todo from "./models/Todo.js";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";

const app = express();
app.use(corsMiddleware);

app.use((err, req, res, next) => {
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({ error: "Acceso prohibido por CORS" });
  }
  next(err); // Pass error to next middleware
});

app.use(securityMiddleware);
globalThis.__APP__ = app;
app.use(express.json());

// Inicialize database and Models
const db = await initDB();
app.locals.db = db;
const userModel = new User(db);
const todoModel = new Todo(db);

// Routes
app.use("/api/auth", authRoutes(userModel));
app.use("/api/todos", todoRoutes(todoModel));

const server = app.listen(3000, () => {
  console.log("Server in http://localhost:3000");
});

export { app, server };
