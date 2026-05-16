import express from "express";

import { registerUser, loginUser } from "../controllers/authController";

import { protect } from "../middleware/authMiddleware";

import { registerValidation } from "../validations/authValidation";

import { validate } from "../middleware/validationMiddleware";

const router = express.Router();

router.post(
  "/register",

  registerValidation,

  validate,

  registerUser,
);

router.post("/login", loginUser);

router.get("/me", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
  });
});

export default router;
