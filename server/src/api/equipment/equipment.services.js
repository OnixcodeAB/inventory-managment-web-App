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

async function updateEquipmentByIdAndUser(equipmentId, newUser) {
  const EquipmentId = parseInt(equipmentId);
  const userId = parseInt(newUser);

  try {
    // Obtener el equipo actual con el historial y usuario actual
    const equipment = await db.equipment.findUnique({
      where: {
        id: EquipmentId,
      },
      include: { usuario: true, userHistories: true },
    });

    //Obtener la info del usuario nuevo
    const NewUser = await db.user.findUnique({ where: { id: userId } });

    // Equipment and new user validation
    if (!equipment) {
      return { error: "Equipment not found" };
    }

    if (!NewUser) {
      return { error: "User not found" };
    }

    // Si hay un usuario actual, actualizar la fecha de fin en el historial
    if (equipment.usuario_id) {
      await db.userHistory.updateMany({
        where: {
          equipment_id: equipmentId,
          user_id: equipment.usuario_id,
          endDate: null, // Encontrar el usuario actual
        },
        data: {
          endDate: new Date(), // Marcar la fecha de fin
        },
      });
    }
    // Asignar nuevo usuario al equipo
    const updatedEquipment = await db.equipment.update({
      where: { id: equipmentId },
      data: {
        usuario_id: NewUser.id,
      },
    });

    // Crear una nueva entrada en el historial para el nuevo usuario
    await db.userHistory.create({
      data: {
        equipment_id: equipmentId,
        user_id: newUser,
        role: NewUser.role,
        startDate: new Date(),
      },
    });
    return { success: "Equipment updated", updatedEquipment };
  } catch (error) {
    return error;
  }
}
