import express from "express";
import authRoutes from "./auth/auth.routes.js";
import equipmentRoutes from "./equipment/equipment.routes.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/auth", authRoutes);
router.use("/equipmet", equipmentRoutes);

export default router;
