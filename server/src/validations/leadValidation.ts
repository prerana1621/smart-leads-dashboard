import { body } from "express-validator";

export const leadValidation = [
  body("name").notEmpty().withMessage("Name is required"),

  body("email").isEmail().withMessage("Valid email required"),

  body("source").notEmpty().withMessage("Source is required"),
];
