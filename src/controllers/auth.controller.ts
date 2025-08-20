import { Request, Response, NextFunction } from "express";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import User, { IUser } from "../models/User";
import { hashPassword, comparePassword, isStrongPassword } from "../utils/password";

const signToken = (user: IUser): string => {
  const payload = { sub: user._id.toString(), email: user.email, role: user.role };

  const secret: Secret = process.env.JWT_SECRET as Secret;
  const expiresIn: string | number = process.env.JWT_EXPIRES_IN ?? "1h";

  return jwt.sign(payload, secret, { expiresIn } as SignOptions);
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { email, password, role } = (req as any).validated.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ error: "Email already registered" });
    }

    if (!isStrongPassword(password)) {
      return res.status(400).json({
        error: "Weak password: need upper, lower, number, special, min 8 chars",
      });
    }

    const passwordHash = await hashPassword(password);
    const user = await User.create({ email, passwordHash, role: role || "rep" });

    const token = signToken(user);
    return res.status(201).json({
      user: { id: user._id, email: user.email, role: user.role, created_at: user.created_at },
      token,
    });
  } catch (e) {
    return next(e);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { email, password } = (req as any).validated.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const ok = await comparePassword(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = signToken(user);
    return res.json({
      user: { id: user._id, email: user.email, role: user.role, created_at: user.created_at },
      token,
    });
  } catch (e) {
    return next(e);
  }
};
