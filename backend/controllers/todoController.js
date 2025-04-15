import { z } from "zod";

const schema = z.object({
  title: z.string().optional(),
  completed: z.boolean().optional(),
  task: z.string().optional(),
});
export default class TodoController {
  constructor(todoModel) {
    this.todoModel = todoModel;
  }

  async createTodo(req, res) {
    const { title, task } = req.body;
    const userId = req.userId; // <- From the middleware
    try {
      const todoId = await this.todoModel.create(userId, title, task);
      res.status(201).json({ id: todoId, task, userId });
    } catch (error) {
      res.status(500).json({ error: "Error creating task" });
    }
  }

  async getTodos(req, res) {
    const userId = req.userId;
    try {
      const todos = await this.todoModel.getAll(userId);
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json({ error: "Error getting TODOs" });
      console.log(error);
    }
  }

  async deleteTodo(req, res) {
    const { id } = req.params;
    const userId = req.userId;
    try {
      const exists = await this.todoModel.delete(userId, id);
      if (!exists) return res.status(404).json({ error: "TODO not found" });

      await this.todoModel.delete(userId, id);
      res.status(204).end(); // No content (Exit without response)
    } catch (error) {
      res.status(500).json({ error: "Error eliminando TODO" });
    }
  }

  async updateTodo(req, res) {
    const { id } = req.params;
    const userId = req.userId;
    try {
      const updated = await this.todoModel.update(
        userId,
        id,
        schema.parse(req.body)
      );
      if (!updated) return res.status(404).json({ error: "TODO not found" });
      res.status(200).json({ message: "TODO updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error updating TODO" });
    }
  }
}
