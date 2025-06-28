import { Router } from "express";
import {
  createTemplate,
  deleteTemplate,
  getAllTemplates,
  getTemplateById,
} from "../../controller/waController/template.controller.js";
import upload from "../../middleware/multer.middleware.js";
import { metaFileUpload } from "../../utils/fileUpload.utils.js";

const router = Router();

router
  .route("/")
  .get(getAllTemplates)
  .post(createTemplate)
  .delete(deleteTemplate);

router.post("/meta/upload-media", upload.single("file"), metaFileUpload);

router.get("/:id", getTemplateById);

export default router;
