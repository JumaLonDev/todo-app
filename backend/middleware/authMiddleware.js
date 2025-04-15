import { verifyToken } from "../utils/jwt.js";

export function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token required" });

  try {
    const decoded = verifyToken(token);
    req.userId = decoded.id; // add userId to request
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token invalid or expired" });
  }
}
