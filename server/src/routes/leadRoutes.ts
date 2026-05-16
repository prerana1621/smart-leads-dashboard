import express from "express";

import {
  createLead,
  getLeads,
  getSingleLead,
  updateLead,
  deleteLead,
} from "../controllers/leadController";

import { protect, adminOnly } from "../middleware/authMiddleware";

import { leadValidation } from "../validations/leadValidation";

import { validate } from "../middleware/validationMiddleware";

const router = express.Router();

router.post(
  "/",

  protect,

  leadValidation,

  validate,

  createLead,
);

router.get("/", protect, getLeads);

router.get("/:id", protect, getSingleLead);

router.put("/:id", protect, updateLead);

router.delete("/:id", protect, adminOnly, deleteLead);

export default router;
