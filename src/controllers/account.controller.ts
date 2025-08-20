import { Request, Response, NextFunction } from "express";
import Account from "../models/Accounts";

export const createAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, industry } = req.body;
    const owner_id = (req as any).user.id;

    const account = await Account.create({ owner_id, name, industry });
    return res.status(201).json(account);
  } catch (err) {
    return next(err);
  }
};

export const getAccounts = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const accounts = await Account.find();
    return res.json(accounts);
  } catch (err) {
    return next(err);
  }
};

export const getAccountById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const account = await Account.findById(req.params.id);
    if (!account) return res.status(404).json({ error: "Account not found" });
    return res.json(account);
  } catch (err) {
    return next(err);
  }
};

export const updateAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const account = await Account.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!account) return res.status(404).json({ error: "Account not found" });
    return res.json(account);
  } catch (err) {
    return next(err);
  }
};

export const deleteAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const account = await Account.findByIdAndDelete(req.params.id);
    if (!account) return res.status(404).json({ error: "Account not found" });
    return res.json({ message: "Account deleted" });
  } catch (err) {
    return next(err);
  }
};
