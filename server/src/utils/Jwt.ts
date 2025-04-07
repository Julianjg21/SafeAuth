import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

// This function generates a JWT token with a payload and a secret key.
export function generateToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });;
}