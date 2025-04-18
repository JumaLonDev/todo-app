import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { fileURLToPath } from "url";

// Obtiene la ruta del directorio actual (ESM)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export async function initDB() {
  const dbPath = process.env.DB_PATH || ":memory:";
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  // Create table 'users' (for JWT)
  await db.exec(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  );
 `);

  // Create table 'todos'
  await db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    task TEXT NOT NULL,
    completed BOOLEAN DEAFULT FALSE,
    user_id INTEGER,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );
 `);

  console.log("Database created!");
  return db;
}
