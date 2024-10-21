import { db } from "../../utils/db.js";
import { hashToken } from "../../utils/hashToken.js";

// used when we create a refresh token
export function addRefreshTokenToWhitelist({ jti, refreshToken, userId }) {
  return db.refreshToken.create({
    data: {
      id: jti,
      hashedToken: hashToken(refreshToken),
      userId,
    },
  });
}

// used to check if the token sent by the client is in the database
export function findRefreshTokenById(id) {
  return db.refreshToken.findUnique({ where: { id } });
}

// soft delete token after usage.
export function deleteRefreshToke(id) {
  return db.refreshToken.update({
    where: { id },
    data: {
      revoked: true,
    },
  });
}

export function revokeTokens(userId) {
  return db.refreshToken.updateMany({
    where: {
      userId,
    },
    data: {
      revoked: true,
    },
  });
}
