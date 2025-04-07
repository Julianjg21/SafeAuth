import { PrismaClient } from "@prisma/client";
import { generateToken } from "../utils/Jwt";
import jwt from "jsonwebtoken";
import { LoginData, RegisterData } from "../types/User";
import { Token, TokenPayload, Roles } from "../types/Auth";
import bcrypt from "bcrypt";

const prisma = new PrismaClient(); // Prisma Client instance


// This function is used to register a new user in the database.
export const register = async (data: RegisterData) => {
  const hashedPassword = await bcrypt.hash(data.password, 10); // Hash the password before storing it
  //
  const user = await prisma.users.create({ // Create a new user in the database
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      roles: {
        connect: [
          { name: "user" },  // Connect the user to the "user" role
        ],
      },
    },
  });

  return user; // Return the created user
};

// This function is used to login a user by verifying their email and password.
export const login = async (data: LoginData) => {
  // Check if the user exists in the database
  const user = await prisma.users.findUnique({
    where: {
      email: data.email,
    },
    include: {
      roles: true,
    }
  });
  if (!user) throw new Error("User not found"); // User not found error
  const match = await bcrypt.compare(data.password, user.password); // Compare the provided password with the hashed password in the database
  if (!match) throw new Error("Incorrect password"); // Password mismatch error
  const token = generateToken({ id: user.id, email: user.email, roles: user.roles });  // If the password matches, generate a JWT token for the user
  return {  token }; // Return the generated token
};

// This function is used to verify the JWT token and extract the user information from it.
export const verify = async (data: Token) => {
  const token = data.token;
  const decoded = jwt.verify( //verify the token using the secret key
    token,
    process.env.JWT_SECRET as string
  ) as TokenPayload;
  if (!decoded) throw new Error("Invalid token");
  return decoded; // Return the decoded token payload
};

// This function is used to verify if the user has the necessary roles to access a specific resource.
export const verifyUserRole = async (data:TokenPayload, allowedRoles: String[] ) => {
  const roles = await prisma.roles.findMany({// Find all roles associated with the user
    where: {
      users: {
        some: {
          email: data.email
        }
      }
    }
  });

  if (!roles || roles.length === 0) throw new Error("No roles were found for the user"); // If no roles are found, throw an error
  if (!roles.some(role => allowedRoles.includes(role.name))) { // Check if the user has  the   necesessary roles
    throw new Error("The user has no permissions");
  }
}
