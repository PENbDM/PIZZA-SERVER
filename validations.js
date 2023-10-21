import { body } from "express-validator";

export const loginValidation = [
  body("email", "Wrong type of email").isEmail(),
  body("password", "Password must be at least five symbols").isLength({
    min: 7,
  }),
];

export const registerValidation = [
  body("email", "Wrong type of email").isEmail(),
  body("password", "Password must be at least five symbols").isLength({
    min: 7,
  }),
  body("fullName", "Name must be at least 3 symbols").isLength({ min: 5 }),
  body("avatarUrl", "Wrong url, try again").optional().isURL(),
];
