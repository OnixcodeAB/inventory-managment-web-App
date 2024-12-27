import express from "express";
import { isAuthenticated } from "../../middleware.js";
import { findUserById } from "./users.services.js";
isAuthenticated;

const router = express.Router();

router.get("/profile", isAuthenticated, async (req, res, next) => {
  try {
    const { userId } = req.payload;
    //console.log(userId);

    const user = await findUserById(userId);
    //console.log({ user });

    if (!user) {
      throw { error: "🚫User not Found🚫" };
    }
    delete user.password;
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
