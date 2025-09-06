
import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("✅ MongoDB connected");
    });

    if (!process.env.MONGODB_URL) {
      throw new Error("MONGODB_URL is not defined in environment variables");
    }

    await mongoose.connect(process.env.MONGODB_URL);
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
