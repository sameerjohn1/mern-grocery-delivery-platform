import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import path from "path";
import { LOCAL_PUBLIC_ID_PREFIX } from "../utils/deleteImage.js";

const getBaseUrl = () => {
  const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`;
  return baseUrl.replace(/\/$/, "");
};

export const uploadImage = async (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "Please select an image" });
  }

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "GreenCart-Images",
      resource_type: "image",
    });

    try {
      if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    } catch (cleanupError) {
      console.log("Local upload cleanup failed:", cleanupError.message);
    }

    return res.status(200).json({
      success: true,
      message: "Image Uploaded Successfully",
      image: { url: result.secure_url, public_id: result.public_id },
    });
  } catch (cloudinaryError) {
    console.log(
      "Cloudinary upload failed, keeping local copy:",
      cloudinaryError.message,
    );

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
