import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { generateTokens } from "../../utils/jwt.js";
import {
  addRefreshTokenToWhitelist,
  deleteRefreshToke,
  findRefreshTokenById,
} from "./auth.services.js";
import {
  createUserByEmailAndPassword,
  findUserById,
  findUsersByEmail,
} from "../users/users.services.js";
import { hashToken } from "../../utils/hashToken.js";

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

router.post("/refresh-token", async (req, res) => {
  const { refreshToken } = req.body;

  try {
    // Verify the refresh token
    const decode = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    console.log(decode);

    // Hash the token to find it in the db
    const hashedToken = hashToken(refreshToken);

    // Find the refresh token in the db
    const existingToken = await findRefreshTokenById(decode?.jti);

    // Validate if refresh token and existingToken
    if (hashedToken !== existingToken?.hashedToken) {
      throw { error: "Unauthorized" };
    }

    // Find the user id in the db
    const user = await findUserById(decode?.userId);
    console.log(user);

    if (!user) {
      throw { error: "Unauthorized", user };
    }

    // if the Token is valid, delete it from the dn
    await deleteRefreshToke(existingToken?.id);

    //Generate new tokens
    const jti = uuidv4();
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(
      user,
      jti
    );

    // Add the new frefresh token to the whitelist db
    await addRefreshTokenToWhitelist({
      jti,
      refreshToken: newRefreshToken,
      userId: user?.id,
    });

    // Send the new tokens to the whitelist
    res.status(200).json({ accessToken, refreshToken: newRefreshToken });
  } catch (error) {
    res.status(403).json(error);
  }
});

export default router;
