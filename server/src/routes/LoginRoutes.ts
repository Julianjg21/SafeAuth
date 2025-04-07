import  express  from "express";
import { loginUser } from "../controllers/LoginController";

const app = express.Router(); // Create a new router instance

app.post("/login", loginUser); // Define the login route

export default app;
