
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AdminJwtPayload extends JwtPayload {
  admin?: string; 
}

const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.token as string | undefined;

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized!" });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as
      | string
      | AdminJwtPayload;

   
    const adminEmail = process.env.ADMIN_EMAIL || '';
    const adminPassword = process.env.ADMIN_PASSWORD || '';
    
    if (decodedToken !== adminEmail + adminPassword) {
      return res.status(401).json({ success: false, message: "Unauthorized!" });
    }

    next();
  } catch (error: any) {
    console.error("Error while authenticating admin:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export default adminAuth;
