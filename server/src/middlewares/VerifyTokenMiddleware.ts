import { Response, Request, NextFunction } from "express";
import { verify } from "../services/AuthService";
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"]; // Get the authorization header from the request
    const token = authHeader?.split(" ")[1]; // Extract the token from the header
    // Check if the token is provided
    if (!token) {
      res.status(403).json({ message: "Token not proportionate" });
      return;
    }
    // Check if the token is valid
    const response = await verify({ token });
    req.user = response; // Attach the user information to the request object
    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({
        message: "Token inválido",
        error: error.message,
      });
    } else {
      res.status(400).json({
        message: "Unknown error verifying token",
        error,
      });
    }
  }
};
