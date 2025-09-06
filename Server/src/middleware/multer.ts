// src/middleware/multer.ts
import multer, { StorageEngine } from "multer";
import { Request } from "express";
import path from "path";

// Configure storage
const storage: StorageEngine = multer.diskStorage({
  // Destination folder (required)
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, "uploads/"); // Make sure this folder exists
  },

  // Filename (required)
  filename: (req: Request, file: Express.Multer.File, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage });

export default upload;
