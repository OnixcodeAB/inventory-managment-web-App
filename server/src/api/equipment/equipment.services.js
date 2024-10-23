import { db } from "../../utils/db.js";

export async function getAllEquipment() {
  try {
    return db.equipment.findMany();
  } catch (error) {
    return error;
  }
}

export async function getEquipmentById(id) {
  try {
    return db.equipment.findUnique({
      where: { id: parseInt(id, 10) },
    });
  } catch (error) {
    return error;
  }
}

export async function createEquipment(equipmentData) {
  try {
    const newEquipment = await db.equipment.create({
      data: equipmentData,
    });
    return newEquipment;
  } catch (error) {
    return error;
  }
}

async function updateEquipmentByIdAndUser(equipmentId, user) {
  try {
    // Obtener el equipo actual con el historial y usuario actual
    const equipment = await db.equipment.findUnique({
      where: {
        id: parseInt(equipmentId),
      },
      include: { usuario: true, userHistories: true },
    });
  } catch (error) {
    return error;
  }
}
