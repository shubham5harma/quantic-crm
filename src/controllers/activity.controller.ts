import { Request, Response, NextFunction } from "express";
import Activity from "../models/Activity";

export const createActivity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { subject, type, due_date, lead_id, account_id, notes } = req.body;
    const owner_id = (req as any).user.id;

    const activity = await Activity.create({
      owner_id,
      subject,
      type,
      due_date,
      lead_id,
      account_id,
      notes,
    });

    return res.status(201).json(activity);
  } catch (err) {
    return next(err);
  }
};

export const getActivities = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const activities = await Activity.find().populate("lead_id account_id");
    return res.json(activities);
  } catch (err) {
    return next(err);
  }
};

export const getActivityById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const activity = await Activity.findById(req.params.id).populate("lead_id account_id");
    if (!activity) return res.status(404).json({ error: "Activity not found" });
    return res.json(activity);
  } catch (err) {
    return next(err);
  }
};

export const updateActivity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!activity) return res.status(404).json({ error: "Activity not found" });
    return res.json(activity);
  } catch (err) {
    return next(err);
  }
};

export const deleteActivity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) return res.status(404).json({ error: "Activity not found" });
    return res.json({ message: "Activity deleted" });
  } catch (err) {
    return next(err);
  }
};
