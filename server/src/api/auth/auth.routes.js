import express from "express";
import { v4 as uuidv4 } from "uuid";
import { generateTokens } from "../../utils/jwt.js";
import { addRefreshTokenToWhitelist } from "./auth.services.js";
import {
  createUserByEmailAndPassword,
  findUsersByEmail,
} from "../users/users.services.js";

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    /*     if (!email || !password) {
      res.status(400);
      throw new Error("You must provide an email and a password");
    } */
    const existingUser = await findUsersByEmail(email);

    if (existingUser) {
      res.status(400);
      throw new Error("Email already in use");
    }

    const user = await createUserByEmailAndPassword({ email, password });
    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(user, jti);
    await addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.id });

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
});
export default router;
