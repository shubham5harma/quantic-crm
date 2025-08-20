import { Request, Response, NextFunction } from "express";
import Lead from "../models/Leads";
import Account from "../models/Accounts";

export const createLead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, company, status } = req.body;
    const owner_id = (req as any).user.id;

    const lead = await Lead.create({ owner_id, name, company, status });
    return res.status(201).json(lead);
  } catch (err) {
    return next(err);
  }
};

export const getLeads = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const leads = await Lead.find();
    return res.json(leads);
  } catch (err) {
    return next(err);
  }
};

export const getLeadById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ error: "Lead not found" });
    return res.json(lead);
  } catch (err) {
    return next(err);
  }
};

export const updateLead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!lead) return res.status(404).json({ error: "Lead not found" });
    return res.json(lead);
  } catch (err) {
    return next(err);
  }
};

export const deleteLead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ error: "Lead not found" });
    return res.json({ message: "Lead deleted" });
  } catch (err) {
    return next(err);
  }
};

export const convertLead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ error: "Lead not found" });

    const account = await Account.create({
      owner_id: lead.owner_id,
      name: lead.company || lead.name,
      industry: "Unknown",
    });

    lead.status = "qualified";
    await lead.save();

    return res.json({ message: "Lead converted", account });
  } catch (err) {
    return next(err);
  }
};
