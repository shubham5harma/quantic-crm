import { Router } from "express";
import { auth } from "../middlewares/auth";
import * as accountController from "../controllers/account.controller";

const router = Router();

router.post("/", auth, accountController.createAccount);
router.get("/", auth, accountController.getAccounts);
router.get("/:id", auth, accountController.getAccountById);
router.put("/:id", auth, accountController.updateAccount);
router.delete("/:id", auth, accountController.deleteAccount);

export default router;
