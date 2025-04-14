// backend/models/User.js
export default class User {
  constructor(db) {
    this.db = db;
  }

  async create(email, password) {
    const result = await this.db.run(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, password]
    );
    return result.lastID; // return new user id
  }

  async findByEmail(email) {
    return await this.db.get("SELECT * FROM users WHERE email = ?", [email]);
  }
}
