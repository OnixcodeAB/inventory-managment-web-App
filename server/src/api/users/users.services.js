import bcrypt from "bcrypt";

import { db } from "../../utils/db.js";

export function findUsersByEmail(email) {
  try {
    return db.user.findUnique({
      where: {
        email,
      },
    });
  } catch (error) {
    return error;
  }
}

export function createUserByEmailAndPassword(user) {
  user.password = bcrypt.hashSync(user.password, 12);
  try {
    return db.user.create({
      data: user,
    });
  } catch (error) {
    return error;
  }
}

export function findUserById(id) {
  const idNum = parseInt(id);
  try {
    return db.user.findUnique({
      where: {
        id: idNum,
      },
    });
  } catch (error) {
    return error;
  }
}
