import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface UserJwtPayload extends JwtPayload {
  id?: string;
}

const userAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: "Unauthorized! No token provided" });
    }
    
    const token = authHeader.split(' ')[1];

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as UserJwtPayload;
    
    if (!decodedToken.id) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
    
    // Add user ID to request object for use in protected routes
    req.userId = decodedToken.id;
    
    next();
  } catch (error: any) {
    console.error("Error while authenticating user:", error);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: "Token expired" });
    }
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

export default userAuth;