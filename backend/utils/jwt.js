import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;

export function generateToken(userId) {
  return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: "1h" });
}

export function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY);
}
