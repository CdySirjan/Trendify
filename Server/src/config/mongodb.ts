// src/config/mongodb.ts
import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("✅ MongoDB connected");
    });

    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    await mongoose.connect(`${process.env.MONGODB_URI}/trendify`);
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1); // Exit if DB connection fails
  }
};

export default connectDB;
