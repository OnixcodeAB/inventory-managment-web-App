import express from 'express';
import { getAllEquipment, getEquipmentById } from './equipment.services.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const equipment = await getAllEquipment();
    res.json(equipment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch equipment' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const equipment = await getEquipmentById(req.params.id);
    if (equipment) {
      res.json(equipment);
    } else {
      res.status(404).json({ error: 'Equipment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch equipment' });
  }
});

export default router;
