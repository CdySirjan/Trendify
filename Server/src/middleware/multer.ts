
import multer, { StorageEngine } from "multer";
import { Request } from "express";
import path from "path";

// Configure storage
const storage: StorageEngine = multer.diskStorage({

  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, "uploads/"); 
  },


  filename: (req: Request, file: Express.Multer.File, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage });

export default upload;
