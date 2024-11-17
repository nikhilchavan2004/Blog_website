import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

import jwt from "jsonwebtoken";
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
    console.log("all fields are  required");
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


export const signin = async (req, res) => {
  const { email, password } = req.body;

  // Input validation
  if (!email || !password || email === "" || password === "") {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if the user exists
    const userv = await User.findOne({ email });
    if (!userv) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare password
    const isMatch = await bcryptjs.compare(password, userv.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: userv._id }, process.env.SECRET_KEY, {
      expiresIn: "15h",
    });

    // Set the token in an HTTP-only cookie
    res.cookie("access_token", token, {
      httpOnly: true, // Prevents client-side JavaScript access
      secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
      sameSite: "strict", // Prevents CSRF
      maxAge: 15 * 60 * 60 * 1000, // Cookie expiration (15 hours)
    });

    // Send success response
    return res.status(200).json({
      message: "User signed in successfully",
      user: { id: userv._id, email: userv.email, username: userv.username }, // Include user info if needed
    });
  } catch (err) {
    // Catch and log any unexpected errors
    console.error("Internal server error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
