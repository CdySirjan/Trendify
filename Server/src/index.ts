
import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb";
import connectCloudinary from "./config/cloudinary";
import userRouter from "./routes/userRoute";
import productRouter from "./routes/productRoute";

// Load environment variables
dotenv.config();

const app: Application = express();
const port: number = parseInt(process.env.PORT || "4000", 10);

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("API is running...");
});

// Initialize database connections and start server
const startServer = async () => {
  try {
    await connectDB();
    await connectCloudinary();
    
    app.listen(port, () => {
      console.log(`✅ Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
