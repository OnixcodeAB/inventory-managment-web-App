import { db } from "../../utils/db.js";

export async function getAllDepartments() {
  return db.department.findMany();
}

export async function getDepartmentById(id) {
  return db.department.findUnique({
    where: { id: parseInt(id, 10) },
  });
}

export async function createDepartment(departmentData) {
  try {
    const newDepartment = await db.department.create({
      data: departmentData,
    });
    return newDepartment;
  } catch (error) {
    // console.log("Failed to create the department", error);
    throw new Error(`${error}`);
  }
}
