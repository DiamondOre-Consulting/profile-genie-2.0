import multer from "multer";
import path from "path";

/* The code is creating a multer middleware instance called `upload`. Multer is a middleware for
handling multipart/form-data, which is commonly used for file uploads. */
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 100 * 1024 * 1024 },
  storage: multer.diskStorage({
    destination: "uploads/",
    filename: (_req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
  fileFilter: (_req, file, cb) => {
    let ext = path.extname(file.originalname);

    if (
      ext !== ".jpg" &&
      ext !== ".jpeg" &&
      ext !== ".webp" &&
      ext !== ".mp4" &&
      ext !== ".gif" &&
      ext !== ".avif" &&
      ext !== ".csv" &&
      ext !== ".pdf" &&
      ext !== ".png"
    ) {
      cb(new Error(`Unsupported file type! ${ext}`), false);
      return;
    }
    cb(null, true);
  },
});

export default upload;
