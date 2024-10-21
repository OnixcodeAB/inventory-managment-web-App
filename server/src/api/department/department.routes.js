import express from 'express';
import { getAllDepartments, getDepartmentById } from './department.services.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const departments = await getAllDepartments();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch departments' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const department = await getDepartmentById(req.params.id);
    if (department) {
      res.json(department);
    } else {
      res.status(404).json({ error: 'Department not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch department' });
  }
});

export default router;
