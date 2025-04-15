import express from "express";
import AuthController from "../controllers/authController.js";

export default function authRoutes(userModel) {
  const router = express.Router();
  const authController = new AuthController(userModel);

  router.post("/register", async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await authController.register(email, password);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await authController.login(email, password);
      res.status(200).json(result);
    } catch (error) {
      res.status(401).json({ error: error.message }); // 401 = Unauthorized
    }
  });

  return router;
}
