import  express  from "express";
import { AdminDashboard } from "../controllers/AdminDashboardController";
import { verifyToken } from "../middlewares/VerifyTokenMiddleware";
import { verifyUserRolMiddlware } from "../middlewares/RoleMiddleware";

const app = express.Router();// create a new router instance

app.get("/admin/dashboard", verifyToken,verifyUserRolMiddlware(["admin"]),  AdminDashboard); // define a route for the admin dashboard

export default app;
