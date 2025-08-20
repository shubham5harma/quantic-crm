import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: { id: string; email: string; role: string };
}

export const auth = (req: AuthRequest, res: Response, next: NextFunction): void | Response => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: "Missing Authorization header" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as {
      sub: string;
      email: string;
      role: string;
    };

    req.user = { id: payload.sub, email: payload.email, role: payload.role };
    return next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
