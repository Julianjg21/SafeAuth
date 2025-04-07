import express from "express";
import dotenv from "dotenv";
import RegisterRoutes from "./routes/RegisterRoutes.ts";
import LoginRoutes from "./routes/LoginRoutes.ts";
import HomeRoutes from "./routes/HomeRoute.ts";
import cors from "cors";
import helmet from "helmet";

dotenv.config(); //read variables of .env

const app = express(); //create express app
app.use(helmet()); //Middleware to protect the app of common attacks

//Middleware para habilitar CORS
const PORT = process.env.PORT || 3000;
app.use(
  cors({
    origin: [process.env.ALLOWED_ORIGINS || "http://localhost:3000"], //allowed origins
    credentials: true, //allow credentials
    methods: ["GET", "POST", "PUT", "DELETE"], //allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], //allowed headers
  })
);

app.use(express.json()); //middlware para teaches json

app.use("/", RegisterRoutes); //Registration routes
app.use("/", LoginRoutes); //Login Routes
app.use("/", HomeRoutes); //Home Routes

app.listen(PORT, () => {
  //start server
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
