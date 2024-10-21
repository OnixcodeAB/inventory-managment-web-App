import { db } from "../../utils/db.js";

export async function getAllEquipment() {
  return db.equipment.findMany();
}

export async function getEquipmentById(id) {
  return db.equipment.findUnique({
    where: { id: parseInt(id, 10) },
  });
}

export async function createEquipment(equipmentData) {
  try {
    const newEquipment = await db.equipment.create({
      data: equipmentData,
    });
    return newEquipment;
  } catch (error) {
    console.log("Failed to create the equipment", error);
    throw new Error("Equipment could not be created");
  }
}
