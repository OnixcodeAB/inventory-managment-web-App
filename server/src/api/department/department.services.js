import { db } from "../../utils/db.js";

export async function getAllDepartments() {
  try {
    return await db.department.findMany();
  } catch (error) {
    return error;
  }
}

export async function getDepartmentById(id) {
  try {
    return await db.department.findUnique({
      where: { id: parseInt(id, 10) },
    });
  } catch (error) {
    return error;
  }
}

export const checkDepartmentByName = async (name) => {
  try {
    const department = await db.department.findFirst({
      where: { name },
    });
    return department;
  } catch (error) {
    return error;
  }
};

export async function createDepartment(departmentData) {
  try {
    const newDepartment = await db.department.create({
      data: departmentData,
    });
    return newDepartment;
  } catch (error) {
    // console.log("Failed to create the department", error);
    return error;
  }
}

export async function updateDepartment(id, name, location) {
  //Ensure the id is an integer
  const parseId = parseInt(id);
  try {
    // Proced to update the department
    const departmentUpdated = await db.department.update({
      where: {
        id: parseId,
      },
      data: {
        name,
        location,
      },
    });

    return departmentUpdated;
  } catch (error) {
    return error;
  }
}

export async function deleteDepartment(id) {
  //Ensure the id is an integer
  const parseId = parseInt(id);

  try {
    await db.department.delete({
      where: {
        id: parseId,
      },
    });

    return { success: "department deleted" };
  } catch (error) {
    // console.log(error)
    return error;
  }
}
