import express from "express";
import {
  createEquipment,
  getAllEquipment,
  getEquipmentById,
  updateEquipmentByIdAndUser,
  checkEquipmentBySerial,
  deleteEquipmentById,
  updateEquipment,
} from "./equipment.services.js";
import { logAudit } from "../../utils/logAudit.js";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

const router = express.Router();

// Retrieve all the equipment
router.get("/", async (req, res) => {
  try {
    const equipment = await getAllEquipment();
    res.json(equipment);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch equipment" });
  }
});

// Retrives equipment By Id
router.get("/:id", async (req, res) => {
  try {
    const equipment = await getEquipmentById(req.params.id);
    if (equipment instanceof PrismaClientValidationError) {
      throw equipment.message;
    } else {
      res.json(equipment);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Create a new equipment
router.post("/", async (req, res) => {
  const equipmentData = req.body;
  try {
    const existingEquipment = await checkEquipmentBySerial(
      equipmentData?.serial
    );
    if (existingEquipment) {
      return res
        .status(400)
        .json({ error: "Equipment with this serial number already exists" });
    }
    const newEquiment = await createEquipment(equipmentData);
    if (newEquiment instanceof PrismaClientValidationError) {
      await logAudit(req, newEquiment.message);
      throw newEquiment.message;
    } else {
      await logAudit(req);
      res.status(200).json(newEquiment);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Update equipment by user
// URL to request update http://localhost:5000/api/v1/equipmet/?id=1&user=2
router.put("/", async (req, res) => {
  const { id, user } = req.query;

  if (!id || !user) {
    return res.status(200).json({ error: "Missing id or user parameter" });
  }
  try {
    const updatedEquipment = await updateEquipmentByIdAndUser(id, user);
    res.json({ updatedEquipment });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Update equipment
router.put("/", async (req, res) => {
  const equimentData = req.body;
  try {
    const updatedEquipment = await updateEquipment(equimentData);
    res.json({ updatedEquipment });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Delete equipment by ID
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const deleteEquipment = await deleteEquipmentById(id);
  try {
    if (deleteEquipment instanceof PrismaClientValidationError) {
      await logAudit(req, deleteEquipment.message);
      throw deleteEquipment.message;
    } else {
      await logAudit(req, deleteEquipment);
      res.status(200).json({ message: "Equipment deleted succesfully" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
