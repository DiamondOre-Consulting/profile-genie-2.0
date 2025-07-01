import fs from "fs/promises";
import cloudinary from "cloudinary";
import AppError from "./error.utils.js";
import axios from "axios";
import { statSync, readFileSync } from "fs";
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
    console.log(3);
    const result = await cloudinary.v2.uploader.upload(file.path, {
      folder: "profile-genie-2.0",
      resource_type: "auto",
    });
    console.log(2);
    if (result) {
      console.log(4);
      fs.rm(`uploads/${file.filename}`);
      return result;
    }
  } catch (err) {
    console.log(1);
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
  try {
    // Validate required file
    if (!req.file) {
      throw new Error("No file uploaded");
    }

    const filePath = req.file.path;
    const fileSize = statSync(filePath).size;
    const fileType = req.file.mimetype;
    const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB

    // Validate environment variables
    if (!process.env.WA_ACCESS_TOKEN || !process.env.APP_ID) {
      throw new Error("Missing required environment variables");
    }

    // 1️⃣ Start upload session
    const startResp = await axios.post(
      `https://graph.facebook.com/v23.0/${process.env.APP_ID}/uploads`,
      null,
      {
        params: {
          file_name: req.file.originalname,
          file_length: fileSize,
          file_type: fileType,
          access_token: process.env.WA_ACCESS_TOKEN,
        },
      }
    );

    const uploadSessionId = startResp.data.id;
    console.log("Upload session ID:", uploadSessionId);

    const buffer = readFileSync(filePath);
    let fileHandle; // To store the final file handle

    // 2️⃣ Upload file (chunked or single)
    if (fileSize > CHUNK_SIZE) {
      // Chunked upload for large files
      let offset = 0;
      while (offset < fileSize) {
        const chunk = buffer.slice(
          offset,
          Math.min(offset + CHUNK_SIZE, fileSize)
        );
        const uploadResp = await axios.post(
          `https://graph.facebook.com/v23.0/${uploadSessionId}`,
          chunk,
          {
            headers: {
              Authorization: `OAuth ${process.env.WA_ACCESS_TOKEN}`,
              "Content-Type": "application/octet-stream",
              file_offset: offset,
            },
          }
        );

        // Store the file handle if returned (final chunk)
        if (uploadResp.data?.h) {
          fileHandle = uploadResp.data.h;
        }

        offset += CHUNK_SIZE;
        console.log(`Uploaded ${offset} of ${fileSize} bytes`);
      }
    } else {
      // Single upload for small files
      const uploadResp = await axios.post(
        `https://graph.facebook.com/v23.0/${uploadSessionId}`,
        buffer,
        {
          headers: {
            Authorization: `OAuth ${process.env.WA_ACCESS_TOKEN}`,
            "Content-Type": "application/octet-stream",
            file_offset: 0,
          },
        }
      );
      fileHandle = uploadResp.data.h;
    }

    // 3️⃣ If we didn't get the handle during upload, finalize the session
    if (!fileHandle) {
      const finalizeResp = await axios.get(
        `https://graph.facebook.com/v23.0/${uploadSessionId}`,
        {
          params: { access_token: process.env.WA_ACCESS_TOKEN },
        }
      );
      fileHandle = finalizeResp.data.h;
    }

    console.log("File handle:", fileHandle);

    // 4️⃣ Optional Cloudinary upload
    let cloudinaryData = null;
    try {
      const sampleMedia = await fileUpload(req.file);
      cloudinaryData = {
        media_url: sampleMedia?.secure_url,
        media_id: sampleMedia?.public_id,
      };
    } catch (cloudinaryError) {
      console.warn("Cloudinary upload failed:", cloudinaryError.message);
    }

    // Success response
    res.status(200).json({
      success: true,
      data: {
        upload_session_id: uploadSessionId, // The full session ID
        meta_upload_id: fileHandle, // The h value for API use
        ...cloudinaryData, // Optional Cloudinary data
      },
      message: "File uploaded successfully",
    });
  } catch (err) {
    console.error("Upload error:", err.response?.data || err.message);
    res.status(500).json({
      success: false,
      error: err.message,
      details: err.response?.data || null,
    });
  }
};

export { avatarUpload, fileUpload, multipleFileUpload, metaFileUpload };
