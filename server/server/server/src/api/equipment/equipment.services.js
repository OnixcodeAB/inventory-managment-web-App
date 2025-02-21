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

    // Validar si el equipo se esta asignado al mismo usuario
    const currentUser = equipment?.usuario_id;
    const newUser = equipmentData?.usuario_id;

    if (currentUser === newUser) {
      console.log(equipmentData);
      const updatedEquipment = await db.equipment.update({
        where: { id: equipment.id },
        data: {
          marca: equipmentData.marca,
          modelo: equipmentData.modelo,
          serial: equipmentData.serial,
          tipo_equipo: equipmentData.tipo_equipo,
          caracteristicas: equipmentData.caracteristicas,
          software: equipmentData.software,
          nombre_equipo: equipmentData.nombre_equipo,
          departamento_id: equipmentData.departamento_id,
          departamento: equipmentData.departamento,
          fecha_adquisicion: equipmentData.fecha_adquisicion,
          estado: equipmentData.estado,
          usuario_id: equipmentData.usuario_id,
          usuario: equipmentData.usuario,
          fecha_ultima_actividad: equipmentData.fecha_ultima_actividad,
        },
      });
      return { success: "Equipment updated", updatedEquipment };
    }

    // Si el equipo está asignado a un usuario diferente, buscar la info del nuevo usuario
    const newUserRecord = await db.user.findUnique({ where: { id: newUser } });

    console.log(newUserRecord);

    if (!newUserRecord) {
      return { error: "User not found" };
    }
    // Hallar y Actualizar la fecha de finalizacion del usuario antiguo
    const oldUserHistoryRecord = await db.userHistory.findFirst({
      where: {
        equipment_id: equipment.id,
        endDate: null,
      },
    });
    if (oldUserHistoryRecord) {
      await db.userHistory.update({
        where: {
          equipment_id: equipment.id,
          endDate: null, // Encontrar el usuario actual
        },
        data: {
          endDate: new Date(), // Marcar la fecha de fin
        },
      });
    }

    // Actualizar el equipo con la nueva informacion
    const updatedEquipment = await db.equipment.updateMany({
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
