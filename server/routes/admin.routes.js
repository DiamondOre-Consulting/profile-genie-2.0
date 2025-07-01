import { Router } from "express";

import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  getAdminDashboardData,
  sendCustomMail,
} from "../controller/admin.controller.js";

const adminRouter = Router();

adminRouter.route("/admin-dashboard").get(getAdminDashboardData);

adminRouter.route("/send-custom-mail", verifyJWT).post(sendCustomMail);

export default adminRouter;
