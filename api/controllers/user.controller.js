import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";

export const test = (req, res) => {
  res.send("Hello World");
};

export const updateUser = async (req, res, next) => {
  console.log(req.user);
  
  if (req.user.id !== req.params.id) {
    return res.status(403).json({ message: "You are not authorized to update this user." });
  }

  try {
    // Hash password if provided
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    // Update user
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password
        }
      },
      { new: true }
    );

    // Remove password from response
    const { password, ...rest } = user._doc;
    
    // Send updated user data back to client
    res.status(200).json(rest);
  } catch (err) {
    next(err); // Pass error to error handling middleware
  }
};