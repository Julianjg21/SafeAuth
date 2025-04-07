import { Response, Request } from "express";

//Test controller for admin dashboard
export const AdminDashboard =  (req: Request, res: Response)  => {
      res.status(200).json({ message: "Success" });
};