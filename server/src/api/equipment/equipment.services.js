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

/* export async function updateEquipmentByIdAndUser(equipmentId, newUser) {
  const equimentIdNum = parseInt(equipmentId);
  const userIdNum = parseInt(newUser);

  try {
    // Obtener el equipo actual con el historial y usuario actual
    const equipment = await db.equipment.findUnique({
      where: {
        id: equimentIdNum,
      },
      include: { usuario: true, userHistories: true },
    });

    if (!equipment) {
      return { error: "Equipment not found" };
    }

    const newUserRecord = await db.user.findUnique({ where: { id: userId } });

    if (!newUserRecord) {
      return { error: "User not found" };
    }

    // Validar si el equipment esta yah asignado al nuevo usuario
    if (equipment.id !== newUserRecord.id) {
      // Validar si el equipo ya tiene un usuario asignado diferente al neuevo
      if (equipment.id) {
        await db.userHistory.updateMany({
          where: {
            equipment_id: equimentIdNum,
            user_id: equipment.usuario_id,
            endDate: null, // Encontrar el usuario actual
          },
          data: {
            endDate: new Date(), // Marcar la fecha de fin
          },
        });
      }

      // Asignar el nuevo usuario al equipo
      const updatedEquipment = await db.equipment.update({
        where: { id: equimentIdNum },
        data: {
          usuario_id: userIdNum.id,
        },
      });
      await logAudit(req, updatedEquipment);

      // Crear una nueva entrada en el historial para el nuevo usuario
      await db.userHistory.create({
        data: {
          equipment_id: equimentIdNum,
          user_id: newUserRecord.id,
          role: newUserRecord.role,
          startDate: new Date(),
        },
      });

      return { success: "Equipment updated", updatedEquipment };
    }
    return {
      message: "No changes made, the user is already assigned to this equipment",
    };
  } catch (error) {
    return error;
  }
}
 */

export async function updateEquipment(equipmentData) {
  const equimentIdNum = parseInt(equipmentId);
  const userIdNum = parseInt(newUser);

  try {
    // Obtener el equipo actual con el historial y usuario actual
    const equipment = await db.equipment.findUnique({
      where: {
        id: equipmentData?.id,
      },
      include: { usuario: true, userHistories: true },
    });

    if (!equipment) {
      return { error: "Equipment not found" };
    }

    // Validar si el equipo se esta asignado a un nuevo usuario
    if (equipment.id !== equipmentData?.id) {
      
      // buscar la info del nuevo usuario
      const newUserRecord = await db.user.findUnique({ where: { id: userId } });

      if (!newUserRecord) {
        return { error: "User not found" };
      }

      // Actualizar la fecha de finalizacion del usuario antiguo
      if (equipment.id) {
        await db.userHistory.updateMany({
          where: {
            equipment_id: equipmentData?.id,
            endDate: null, // Encontrar el usuario actual
          },
          data: {
            endDate: new Date(), // Marcar la fecha de fin
          },
        });
      }

      // Actualizar el equipo con la nuevo informacion
      const updatedEquipment = await db.equipment.update({
        where: { id: equipmentData?.id },
        data: {
          ...equipmentData,
        },
      });

      // Crear una nueva entrada en el historial para el nuevo usuario
      await db.userHistory.create({
        data: {
          equipment_id: equipmentData.id,
          user_id: newUserRecord.id,
          role: newUserRecord.role,
          startDate: new Date(),
        },
      });

      return { success: "Equipment updated", updatedEquipment };
    }
    return {
      message:
        "No changes made, the user is already assigned to this equipment",
    };
  } catch (error) {
    return error;
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
