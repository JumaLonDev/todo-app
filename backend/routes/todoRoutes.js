import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import TodoController from "../controllers/todoController.js";

export default function todoRoutes(todoModel) {
  const router = express.Router();
  const todoController = new TodoController(todoModel);

  router.post(
    "/",
    authenticate,
    todoController.createTodo.bind(todoController)
  );
  router.get("/", authenticate, todoController.getTodos.bind(todoController));
  router.delete(
    "/:id",
    authenticate,
    todoController.deleteTodo.bind(todoController)
  );
  router.patch(
    "/:id",
    authenticate,
    todoController.updateTodo.bind(todoController)
  );

  return router;
}
