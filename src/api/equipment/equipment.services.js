import { db } from "../../utils/db.js";

export async function getAllEquipment() {
  return db.equipment.findMany();
}

export async function getEquipmentById(id) {
  return db.equipment.findUnique({
    where: { id: parseInt(id, 10) },
  });
}
