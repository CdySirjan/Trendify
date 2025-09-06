
import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async (): Promise<void> => {
  if (!process.env.CLOUDINARY_URL) {
    throw new Error("CLOUDINARY_URL is not defined in environment variables");
  }

  // The CLOUDINARY_URL environment variable will automatically configure cloudinary
  // Format: cloudinary://api_key:api_secret@cloud_name
};

export default connectCloudinary;
