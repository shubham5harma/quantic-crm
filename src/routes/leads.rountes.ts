import { Router } from "express";
import { auth } from "../middlewares/auth";
import * as leadController from "../controllers/lead.controller";

const router = Router();

router.post("/", auth, leadController.createLead);
router.get("/", auth, leadController.getLeads);
router.get("/:id", auth, leadController.getLeadById);
router.put("/:id", auth, leadController.updateLead);
router.delete("/:id", auth, leadController.deleteLead);
router.post("/:id/convert", auth, leadController.convertLead);

export default router;
