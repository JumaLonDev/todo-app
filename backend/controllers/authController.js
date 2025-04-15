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

  async login(email, password) {
    const user = await this.userModel.findByEmail(email);
    if (!user) throw new Error("User not found");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error("Invalid password");

    return {
      id: user.id,
      email: user.email,
      token: generateToken(user.id),
    };
  }
}
