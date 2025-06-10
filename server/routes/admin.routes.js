import { Router } from "express";

import { verifyJWT } from "../middleware/auth.middleware.js";
import { getAdminDashboardData } from "../controller/admin.controller.js";

const adminRouter = Router();

adminRouter.route("/admin-dashboard", verifyJWT).get(getAdminDashboardData);

export default adminRouter;
