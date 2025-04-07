import { Request, Response } from "express";
import { register } from "../services/AuthService";

// This controller handles the registration of a new user
export const registerUser = async (req: Request, res: Response) => {
  try {
    //Function to register a new user
    const user = await register(req.body);
    res.status(201).json({ message: "User created with success",user: user.name });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        message: "Error when creating the user",
        error: error.message,
      });
    } else {
      res.status(400).json({
        message: "Unknown error when creating the user",
        error,
      });
    }
  }
};
