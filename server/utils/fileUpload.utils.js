import fs from "fs/promises";
import cloudinary from "cloudinary";
import AppError from "./error.utils.js";

const avatarUpload = async (file, publicId = "") => {
  try {
    if (publicId) {
      await cloudinary.v2.uploader.destroy(publicId);
    }

    const result = await cloudinary.v2.uploader.upload(file.path, {
      folder: "profile-genie-2.0",
      width: 250,
      height: 250,
      gravity: "faces",
      crop: "fill",
    });
    if (result) {
      fs.rm(`uploads/${file.filename}`);
      return result;
    }
  } catch (err) {
    throw new AppError("File can not get uploaded", 500);
  }
};

const fileUpload = async (file, publicId = "") => {
  try {
    if (publicId) {
      await cloudinary.v2.uploader.destroy(publicId);
    }

    const result = await cloudinary.v2.uploader.upload(file.path, {
      folder: "profile-genie-2.0",
    });
    if (result) {
      fs.rm(`uploads/${file.filename}`);
      return result;
    }
  } catch (err) {
    throw new AppError("File can not get uploaded", 500);
  }
};

const multipleFileUpload = async (files, publicId = "") => {
  try {
    const uploadedFiles = [];
    for (const file of Object.values(files)) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "profile-genie-2.0",
      });
      const fileNameWithExtension = file.originalname;
      const fileName = fileNameWithExtension.split(".").slice(0, -1).join(".");

      uploadedFiles.push({ uniqueId: fileName, result: result });
      fs.rm(`uploads/${fileNameWithExtension}`);
    }
    return uploadedFiles;
  } catch (err) {
    throw new AppError("File can not get uploaded", 500);
  }
};

export { avatarUpload, fileUpload, multipleFileUpload };
