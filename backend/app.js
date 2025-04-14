import express from "express";
import { initDB } from "./config/db.config.js";
import User from "./models/User.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(express.json());

// Inicialize database and Models
const db = await initDB();
const userModel = new User(db);

// Register routes
app.use("/api/auth", authRoutes(userModel));

app.listen(3000, () => console.log("Server in http://localhost:3000"));
