import jwt from "jsonwebtoken";

export function isAuthenticated(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "🚫 Un-Authorized 🚫" });
  }

  try {
    console.log({ authorization });
    const token = authorization.split(" ")[1];
    console.log({ token });
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.payload = payload;
  } catch (error) {
    if (error?.name === "TokenExpiredError") {
      throw { error: error.name };
    }
    return res.status(401).json({ message: "🚫 Un-Authorized 🚫", error });
  }
  return next();
}
