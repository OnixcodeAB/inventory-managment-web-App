import { db } from "../../utils/db.js";

export async function getAllDepartments() {
  return db.department.findMany();
}

export async function getDepartmentById(id) {
  return db.department.findUnique({
    where: { id: parseInt(id, 10) },
  });
}
