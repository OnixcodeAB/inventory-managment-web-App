import bcrypt from "bcrypt";

import { db } from "../../utils/db.js";

export async function findUsersByEmail(email) {
  try {
    return await db.user.findUnique({
      where: {
        email: email,
      },
    });
  } catch (error) {
    return error;
  }
}

export async function createUserByEmailAndPassword(user) {
  user.password = bcrypt.hashSync(user.password, 12);
  try {
    return await db.user.create({
      data: user,
    });
  } catch (error) {
    return error;
  }
}

export async function findUserById(id) {
  const idNum = parseInt(id);
  try {
    return await db.user.findUnique({
      where: {
        id: idNum,
      },
    });
  } catch (error) {
    return error;
  }
}
