import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import path from "path";
import { LOCAL_PUBLIC_ID_PREFIX } from "../utils/deleteImage.js";

const CLOUDINARY_FOLDER = "GreenCart-Images";

const getBaseUrl = () => {
  const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`;
  return baseUrl.replace(/\/$/, "");
};

const uploadBuffer = (buffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: CLOUDINARY_FOLDER, resource_type: "image" },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      },
    );

    stream.end(buffer);
  });

export const uploadImage = async (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "Please select an image" });
  }

  const isBufferUpload = Boolean(req.file.buffer);

  try {
    const result = isBufferUpload
      ? await uploadBuffer(req.file.buffer)
      : await cloudinary.uploader.upload(req.file.path, {
          folder: CLOUDINARY_FOLDER,
          resource_type: "image",
        });

    if (!isBufferUpload) {
      try {
        if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
      } catch (cleanupError) {
        console.log("Local upload cleanup failed:", cleanupError.message);
      }
    }

    return res.status(200).json({
      success: true,
      message: "Image Uploaded Successfully",
      image: { url: result.secure_url, public_id: result.public_id },
    });
  } catch (cloudinaryError) {
    console.log("Cloudinary upload failed:", cloudinaryError.message);

    if (isBufferUpload) {
      return res
        .status(500)
        .json({ success: false, message: "Image upload failed" });
    }

    console.log("Keeping local copy instead.");

    const filename = path.basename(req.file.path);

    return res.status(200).json({
      success: true,
      message: "Image Uploaded Successfully",
      image: {
        url: `${getBaseUrl()}/uploads/${filename}`,
        public_id: `${LOCAL_PUBLIC_ID_PREFIX}${filename}`,
      },
    });
  }
};
