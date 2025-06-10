import { Router } from "express";
import upload from "../middleware/multer.middleware.js";
import {
  createPortfolio,
  createPortfolioContact,
  createPortfolioDetail,
  deletePortfolio,
  getAllPortfolio,
  getRecycledPortfolio,
  getSinglePortfolio,
  recyclePortfolio,
  restorePortfolio,
  updatePortfolio,
  updatePortfolioContact,
  updatePortfolioDetail,
  updateStatusActive,
  updateStatusPaid,
} from "../controller/portfolio.controller.js";

import {
  createMetaData,
  updateMetaData,
} from "../controller/metaData.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const portfolioRouter = Router();

portfolioRouter
  .route("/", verifyJWT)
  .post(upload.array("files", 3), createPortfolio)
  .get(getAllPortfolio);

portfolioRouter
  .route("/:id", verifyJWT)
  .put(upload.array("files", 3), updatePortfolio)
  .delete(deletePortfolio);

portfolioRouter.route("/:userName").get(getSinglePortfolio);

portfolioRouter.route("/others/:id", verifyJWT).put(
  upload.fields([
    { name: "brands", maxCount: 30 },
    { name: "services", maxCount: 30 },
    { name: "products", maxCount: 30 },
    { name: "bulkLink", maxCount: 30 },
  ]),
  updatePortfolioDetail
);

portfolioRouter
  .route("/contact/:id", verifyJWT)
  .put(
    upload.fields([{ name: "otherSocial", maxCount: 15 }]),
    updatePortfolioContact
  );

portfolioRouter
  .route("/meta/:id", verifyJWT)
  .put(upload.single("favIcon"), updateMetaData);

portfolioRouter
  .route("/recycle/all-portfolio", verifyJWT)
  .get(getRecycledPortfolio);

portfolioRouter.route("/recycle/:id", verifyJWT).put(recyclePortfolio);

portfolioRouter.route("/restore/:id", verifyJWT).put(restorePortfolio);

portfolioRouter
  .route("/update-active-status/:id")
  .put(verifyJWT, updateStatusActive);

portfolioRouter
  .route("/update-paid-status/:id", verifyJWT)
  .put(updateStatusPaid);

export default portfolioRouter;
