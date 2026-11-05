import multer from "multer";
import path from "path";
import fs from "fs";
import uploadDir from "../utils/uploadsDir.js";

const ensureUploadDirectory = () => {
  try {
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
  } catch (error) {
    console.error("Upload directory error:", error.message);
    throw error;
  }
};

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      ensureUploadDirectory();
      cb(null, uploadDir);
    } catch (error) {
      cb(error, null);
    }
  },
  filename: (req, file, cb) => {
    try {
      cb(null, Date.now() + path.extname(file.originalname));
    } catch (error) {
      cb(error);
    }
  },
});

// Vercel's filesystem is read-only/ephemeral, so keep uploaded files in memory
// there and stream them straight to Cloudinary.
const storage = process.env.VERCEL ? multer.memoryStorage() : diskStorage;

const upload = multer({ storage });
export default upload;
