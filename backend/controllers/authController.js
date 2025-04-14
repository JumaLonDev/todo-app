import { generateToken } from "../utils/jwt.js";
import bcrypt from "bcryptjs";

export default class AuthController {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async register(email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await this.userModel.create(email, hashedPassword);
    return { id: userId, token: generateToken(userId) };
  }
}
