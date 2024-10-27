import express, { json } from "express";
import {
  createDepartment,
  deleteDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
} from "./department.services.js";

const router = express.Router();

// Retrieve all the department
router.get("/", async (req, res) => {
  try {
    const departments = await getAllDepartments();
    if (departments?.code) {
      throw departments;
    } else {
      res.status(200).json(departments);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Retrieve department By Id
router.get("/:id", async (req, res) => {
  try {
    const department = await getDepartmentById(req.params.id);
    if (department) {
      res.json(department);
    } else {
      res.status(404).json({ error: "Department not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch department" });
  }
});

// Create a new department
router.post("/", async (req, res) => {
  ñ;
  const departmentData = req.body;
  try {
    const newDepartment = await createDepartment(departmentData);
    if (newDepartment?.code) {
      throw newDepartment;
    }
    res.status(200).json({ ...newDepartment });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ error });
  }
});

// Update department By Id
router.put("/", async (req, res) => {
  const { id, name, location } = req.body;
  try {
    const newDepartment = await updateDepartment(id, name, location);
    if (newDepartment.code) {
      throw newDepartment;
    } else {
      res.status(200).json({ ...newDepartment });
    }
  } catch (error) {
    /* console.log({ error }); */
    res.status(500).json({ error });
  }
});

// Delete department By Id
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const DeleteDepartment = await deleteDepartment(id);
    if (DeleteDepartment.code) {
      throw DeleteDepartment;
    } else {
      res.status(200).json({ message: "department deleted" });
    }
  } catch (error) {
    /* console.log({ error }); */
    res.status(500).json({ error });
  }
});

export default router;
