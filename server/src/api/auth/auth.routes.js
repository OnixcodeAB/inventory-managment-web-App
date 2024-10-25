import express from "express";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { generateTokens } from "../../utils/jwt.js";
import { addRefreshTokenToWhitelist } from "./auth.services.js";
import {
  createUserByEmailAndPassword,
  findUsersByEmail,
} from "../users/users.services.js";

const router = express.Router();

router.post("/register", async (req, res, next) => {
  const newUser = req.body;
  try {
    //console.log(newUser);
    const existingUser = await findUsersByEmail(newUser?.email);

    if (existingUser) {
      throw { error: "Email already in use" };
    }

    const user = await createUserByEmailAndPassword(newUser);
    if (user?.code) {
      throw user;
    } else {
      const jti = uuidv4();
      const { accessToken, refreshToken } = generateTokens(user, jti);
      await addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.id });

      res.json({
        accessToken,
        refreshToken,
      });
    }
  } catch (error) {
    res.status(400).json({ ...error });
    //next({ error });
  }
});

router.post("/login", async (req, res) => {
  const userLogin = req.body;
  try {
    const existingUser = await findUsersByEmail(userLogin?.email);
    if (!existingUser) {
      throw { error: "Invalid login credentials!" };
    }
    const validPassword = await bcrypt.compare(
      userLogin?.password,
      existingUser?.password
    ); // true or false
    if (!validPassword) {
      throw { error: "Invalid login credentials!" };
    }

    // Generate access tokens
    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(existingUser, jti);

    // add token to the db
    await addRefreshTokenToWhitelist({
      jti,
      refreshToken,
      userId: existingUser?.id,
    });

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    res.status(403).json(error);
  }
});
export default router;
