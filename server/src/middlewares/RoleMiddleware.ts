import { Request, Response, NextFunction } from "express";
import { TokenPayload } from "../types/Auth";
import { verifyUserRole } from "../services/AuthService";

export const verifyUserRolMiddlware = (allowedRoles: string[]) => {
  // Check if allowedRoles is defined and has at least one role
  if (!allowedRoles || !allowedRoles.length) {
    throw new Error("No allowed roles have been defined");
  }

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        res.status(401).json({ message: "A token has not been provided" });
        return;
      }
      const user = req.user as TokenPayload;
      // Function to check if the user has the required role
      await verifyUserRole(user, allowedRoles);
      next(); //If the user has the required role, call the next middleware or controller
    } catch (error) {
      if (error instanceof Error) {
        res.status(403).json({
          message: "Error when verifying user permissions",
          error: error.message,
        });
      } else {
        res.status(400).json({
          message: "Unknown error when verifying user permissions",
          error,
        });
      }
    }
  };
};
