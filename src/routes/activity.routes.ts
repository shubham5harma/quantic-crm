import { Router } from "express";
import { auth } from "../middlewares/auth";
import {
  createActivity,
  getActivities,
  getActivityById,
  updateActivity,
  deleteActivity,
} from "../controllers/activity.controller";

const router = Router();

router.post("/", auth, createActivity);
router.get("/", auth, getActivities);
router.get("/:id", auth, getActivityById);
router.put("/:id", auth, updateActivity);
router.delete("/:id", auth, deleteActivity);

export default router;
