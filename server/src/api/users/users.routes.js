import express from "express";
import { isAuthenticated } from "../../middleware";
import { findUserById } from "./users.services";
isAuthenticated;

const router = express.Router();

router.get("/profile", isAuthenticated, async (req, res, next) => {
  try {
    const { userId } = req.payload;
    const user = await findUserById(userId);
    console.log({ user });
    if (!user) {
      throw { error: "🚫User not Found🚫" };
    }
    delete user.password;
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
});

export default router;
