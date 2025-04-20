export default class Todo {
  constructor(db) {
    this.db = db;
  }

  async create(userId, title, task, completed = false) {
    const result = await this.db.run(
      `INSERT INTO todos (title, task,completed, user_id) VALUES (?, ?, ?, ?)`,
      [title, task, completed, userId]
    );
    return result.lastID; // return the new todo id
  }

  async getAll(userId) {
    return await this.db.all(`SELECT * FROM todos WHERE user_id = ?`, [userId]);
  }

  async delete(userId, todoId) {
    const todo = await this.db.get(
      `SELECT * FROM todos WHERE id = ? AND user_id = ?`,
      [todoId, userId]
    );

    if (!todo) return false; // Todo not exists or not owned by user

    await this.db.run(`DELETE FROM todos WHERE id = ? AND user_id = ?`, [
      todoId,
      userId,
    ]);

    return true;
  }

  async update(userId, todoId, updates) {
    const fields = Object.keys(updates)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = Object.values(updates);
    values.push(todoId, userId);

    const result = await this.db.run(
      `UPDATE todos SET ${fields} WHERE id = ? and user_id = ?`,
      values
    );
    return result.changes > 0;
  }
}
