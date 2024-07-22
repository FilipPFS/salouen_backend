import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../mg-models/User";

interface AuthRequest extends Request {
  auth?: {
    userId: string;
    isAdmin: boolean;
  };
}

const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const decodedToken = jwt.verify(
      token,
      "RANDOM_TOKEN_SECRET"
    ) as jwt.JwtPayload;
    const userId = decodedToken.userId as string;

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("Utilisateur n'a pas été trouvé.");
    }

    req.auth = {
      userId: user._id.toString(),
      isAdmin: user.isAdmin,
    };

    if (!user.isAdmin) {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    next();
  } catch (error: unknown) {
    res.status(401).json({ error });
  }
};

export default authMiddleware;
