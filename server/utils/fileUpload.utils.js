import fs from "fs/promises";
import cloudinary from "cloudinary";
import AppError from "./error.utils.js";
import axios from "axios";
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

const metaFileUpload = async (req, res) => {
  const file = req.file;
  if (!file) {
    throw new AppError("No file provided", 400);
  }

  try {
    const fsStat = await fs.stat(file.path);
    const fileLength = fsStat.size;
    const fileName = file.filename;
    const fileType = file.mimetype;

    const accessToken = process.env.WA_ACCESS_TOKEN;
    const phone_id = process.env.PHONE_NUMBER_ID;
    if (!phone_id) {
      throw new AppError("PHONE_NUMBER_ID environment variable not set", 500);
    }
    if (!accessToken) {
      throw new AppError("WA_ACCESS_TOKEN environment variable not set", 500);
    }

    // New URL for meta file upload
    const url = `https://graph.facebook.com/v22.0/${phone_id}/media`;

    // Prepare form data
    const FormData = (await import("form-data")).default;
    const form = new FormData();
    form.append("file", await fs.readFile(file.path), {
      filename: fileName,
      contentType: fileType,
      knownLength: fileLength,
    });
    form.append("messaging_product", "whatsapp");

    const response = await axios.post(url, form, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...form.getHeaders(),
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });

    const sample_url = await fileUpload(file);

    console.log(sample_url);

    if (response.status >= 200 && response.status < 300) {
      res.status(200).json({
        success: true,
        data: {
          meta_upload_id: response.data.id,
          media_url: sample_url.secure_url,
          media_id: sample_url.public_id,
        },
        message: "File uploaded successfully",
      });
    } else {
      throw new AppError("Failed to upload file to WhatsApp", 500);
    }
  } catch (err) {
    throw new AppError(`Error uploading file: ${err.message}`, 500);
  }
};

export { avatarUpload, fileUpload, multipleFileUpload, metaFileUpload };
