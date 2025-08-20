import { Router } from "express";
import { z } from "zod";
import { validate } from "../middlewares/validate";
import { signup, login } from "../controllers/auth.controller";

const router = Router();

const signupSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
    role: z.enum(["rep", "manager"]).optional(),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(1),
  }),
});

router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);

export default router;
