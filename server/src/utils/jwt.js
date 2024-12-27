import jwt from "jsonwebtoken";

// Usually  keep the token between 5 minutes - 15 minutes
export function generateAccessToken(user) {
  return jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "1h",
  });
}

export function generateRefreshToken(user, jti) {
  return jwt.sign(
    {
      userId: user.id,
      jti,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "8h",
    }
  );
}

export function generateTokens(user, jti) {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);
  console.log({ accessToken, refreshToken });
  return {
    accessToken,
    refreshToken,
  };
}
