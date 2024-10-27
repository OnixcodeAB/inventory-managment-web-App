import express from "express";
import authRoutes from "./auth/auth.routes.js";
import equipmentRoutes from "./equipment/equipment.routes.js";
import departmentRoutes from "./department/department.routes.js";
import usersRoutes from "./users/users.routes.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/auth", authRoutes);
router.use("/equipmet", equipmentRoutes);
router.use("/department", departmentRoutes);
router.use("/users", usersRoutes);

export default router;
