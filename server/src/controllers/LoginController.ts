import { Request, Response } from "express";
import { login } from "../services/AuthService";

// This controller handles the login process for users
export const loginUser = async (req: Request, res: Response) => {
  try {
    //validate credentials received from the request body
    const user = await login(req.body);
     res.status(200).json({ message: "Logged user with success", user});
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        message: "Error at logging",
        error: error.message,
      });
    } else {
      res.status(400).json({
        message: "Unknown error at logging",
        error,
      });
    }
  }
};
