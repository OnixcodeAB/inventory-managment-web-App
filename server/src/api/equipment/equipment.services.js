import { db } from "../../utils/db.js";
import { logAudit } from "../../utils/logAudit.js";

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

export const checkEquipmentBySerial = async (serial) => {
  try {
    const equipment = await db.equipment.findUnique({
      where: { serial },
    });
    return equipment;
  } catch (error) {
    return error;
  }
};

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

export async function updateEquipment(equipmentData) {
  if (!equipmentData?.id) {
    return { error: "Invalid equipment data: ID is required" };
  }

  try {
    // Fetch equipment with related data
    const equipment = await db.equipment.findUnique({
      where: { id: equipmentData.id },
      include: { usuario: true, userHistories: true },
    });

    if (!equipment) {
      return { error: "Equipment not found" };
    }

    const currentUser = equipment.usuario_id;
    const newUser = equipmentData.usuario_id;

    if (currentUser === newUser) {
      // Update equipment if assigned to the same user
      const updatedEquipment = await db.equipment.update({
        where: { id: equipment.id },
        data: {
          ...equipmentData, // Spread all properties for cleaner code
        },
      });

      return { success: "Equipment updated", updatedEquipment };
    }

    // Fetch new user information
    const newUserRecord = await db.user.findUnique({ where: { id: newUser } });
    if (!newUserRecord) {
      return { error: "New user not found" };
    }

    // Mark the previous user assignment as ended
    const oldUserHistory = await db.userHistory.findFirst({
      where: { equipment_id: equipment.id, endDate: null },
    });

    if (oldUserHistory) {
      await db.userHistory.update({
        where: { id: oldUserHistory.id },
        data: { endDate: new Date() },
      });
    }

    // Update equipment with new user information
    const updatedEquipment = await db.equipment.update({
      where: { id: equipment.id },
      data: { ...equipmentData },
    });

    // Create a new history entry for the new user
    await db.userHistory.create({
      data: {
        equipment_id: equipment.id,
        user_id: newUserRecord.id,
        role: newUserRecord.role,
        startDate: new Date(),
      },
    });

    return { success: "Equipment updated and reassigned", updatedEquipment };
  } catch (error) {
    console.error("Error updating equipment:", error);
    return { error: "An unexpected error occurred. Please try again." };
  }
}


export async function deleteEquipmentById(id) {
  try {
    const equipmentId = parseInt(id, 10);
    const deleteEquipment = await db.equipment.delete({
      where: { id: equipmentId },
    });

    return deleteEquipment;
  } catch (error) {
    return error;
  }
}
