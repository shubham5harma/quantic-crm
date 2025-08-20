import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/auth.routes";

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/auth", authLimiter);

// Routes
app.use("/auth", authRoutes);

app.get("/health", (_req: Request, res: Response) => res.json({ ok: true }));

app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Not found" });
});

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Server error" });
});

export default app;
