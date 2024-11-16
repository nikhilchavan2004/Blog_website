import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { error } from "../utils/error.js";
export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next.error(400, "all fields are  required");
  }
  const hashPassword = bcryptjs.hashSync(password, 10);

  const usr = new User({
    username,
    email,
    password: hashPassword,
  });
  await usr.save();
  res.status(201).json({
    message: "User created successfully",
    user: usr,
  });
};
