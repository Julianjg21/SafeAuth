import  express  from "express";
import { registerUser } from "../controllers/RegisterUserController";

const app = express.Router(); // Create a new router instance

app.post("/register", registerUser); // Define the route for user registration


export default app;