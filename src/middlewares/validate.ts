import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

export const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void | Response => {
    try {
      (req as any).validated = schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      return next();
    } catch (e) {
      if (e instanceof ZodError) {
        return res.status(400).json({
          error: "Validation failed",
          details: e.flatten(),
        });
      }
      return next(e);
    }
  };
