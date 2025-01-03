import express from "express";
import authRoutes from "./auth/auth.routes.js";
import equipmentRoutes from "./equipment/equipment.routes.js";
import departmentRoutes from "./department/department.routes.js";
import usersRoutes from "./users/users.routes.js";
import { isAuthenticated } from "../middleware.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/auth", authRoutes);
router.use("/equipment", isAuthenticated, equipmentRoutes);
router.use("/department", isAuthenticated, departmentRoutes);
router.use("/users", isAuthenticated, usersRoutes);

export default router;
