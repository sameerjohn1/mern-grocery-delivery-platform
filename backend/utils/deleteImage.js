import fs from "fs";
import path from "path";
import cloudinary from "../config/cloudinary.js";
import uploadsDir from "./uploadsDir.js";

export const LOCAL_PUBLIC_ID_PREFIX = "local:";
const FRONTEND_STATIC_PUBLIC_ID_PREFIX = "frontend-static:";

export const deleteImage = async (publicId) => {
  if (!publicId) return;
  if (publicId.startsWith(FRONTEND_STATIC_PUBLIC_ID_PREFIX)) return;

  try {
    if (publicId.startsWith(LOCAL_PUBLIC_ID_PREFIX)) {
      const filename = publicId.slice(LOCAL_PUBLIC_ID_PREFIX.length);
      const filePath = path.join(uploadsDir, filename);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      return;
    }

    await cloudinary.uploader.destroy(publicId, { invalidate: true });
  } catch (error) {
    console.log("Image cleanup failed:", error.message);
  }
};
