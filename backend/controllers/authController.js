import { generateToken } from "../utils/jwt.js";
import bcrypt from "bcryptjs";

export default class AuthController {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async register(email, password) {
    try {
      // verify if user exists
      const userExits = await this.userModel.findByEmail(email);
      if (userExits) throw new Error("User already exists");

      // hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // create user
      const userId = await this.userModel.create(email, hashedPassword);

      // generate token
      return { id: userId, token: generateToken(userId) };
    } catch (error) {
      console.error("Error on register:", error);
      throw error;
    }
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
