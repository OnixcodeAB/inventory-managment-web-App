import { db } from "../../utils/db.js";
import { hashToken } from "../../utils/hashToken.js";

// used when we create a refresh token
export async function addRefreshTokenToWhitelist({
  jti,
  refreshToken,
  userId,
}) {
  try {
    return await db.refreshToken.create({
      data: {
        id: jti,
        hashedToken: hashToken(refreshToken),
        user_id: userId,
      },
    });
  } catch (error) {
    return error;
  }
}

// used to check if the token sent by the client is in the database
export async function findRefreshTokenById(id) {
  try {
    return await db.refreshToken.findUnique({ where: { id } });
  } catch (error) {
    return error;
  }
}

// soft delete token after usage.
export async function deleteRefreshToke(id) {
  try {
    return await db.refreshToken.update({
      where: { id },
      data: {
        revoked: true,
      },
    });
  } catch (error) {
    return error;
  }
}

export async function revokeTokens(userId) {
  try {
    return await db.refreshToken.updateMany({
      where: {
        userId,
      },
      data: {
        revoked: true,
      },
    });
  } catch (error) {
    return error;
  }
}
