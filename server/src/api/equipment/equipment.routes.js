import express from "express";
import {
  createEquipment,
  getAllEquipment,
  getEquipmentById,
} from "./equipment.services.js";

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
    if (equipment) {
      res.json(equipment);
    } else {
      res.status(404).json({ error: "Equipment not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch equipment" });
  }
});

// Create a new equipment
router.post("/", async (req, res) => {
  const equipmentData = req.body;

  try {
    const newEquiment = await createEquipment(equipmentData);
    res.status(200).json(newEquiment);
  } catch (error) {
    res.status(500).json({ error: "Failed to create equipment" });
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
    console.log({ id, user });
    res.json({ id, user });
  } catch (error) {
    res.status(500).json({ error: "Failed to update equipment" });
  }
});

export default router;
