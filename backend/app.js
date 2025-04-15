import express from "express";
import { initDB } from "./config/db.config.js";
import User from "./models/User.js";
import Todo from "./models/Todo.js";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";

const app = express();
app.use(express.json());

// Inicialize database and Models
const db = await initDB();
const userModel = new User(db);
const todoModel = new Todo(db);

// Routes
app.use("/api/auth", authRoutes(userModel));
app.use("/api/todos", todoRoutes(todoModel));

const server = app.listen(3000, () =>
  console.log("Server in http://localhost:3000")
);
export { app, server };
