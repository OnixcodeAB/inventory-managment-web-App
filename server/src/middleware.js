import jwt from "jsonwebtoken";
import { db } from "./utils/db";

export function isAuthenticated(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "🚫 Un-Authorized 🚫" });
  }

  try {
    //console.log({ authorization });

    const token = authorization.split(" ")[1];
    //console.log({ token });

    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.payload = payload;
  } catch (error) {
    if (error?.name === "TokenExpiredError") {
      return res.status(401).json({ error });
    }
    return res.status(401).json({ message: "🚫 Un-Authorized 🚫", error });
  }
  return next();
}

export async function logAudit(req, res, next) {
  try {
    const { userId } = req.payload;
    const equipment_id = req.body?.equipment_id;

    let action;

    if (req.method === "PUT") {
      action = "UPDATE";
    } else if (req.method === "POST") {
      action = "CREATE";
    } else if (req.method === "DELETE") {
      action = "DELETE";
    }

    if (action) {
      await db.auditLog.create({
        data: {
          equipment_id,
          user_id: userId,
          action,
          changes: JSON.stringify(req.body),
        },
      });
    }

    return next();
  } catch (error) {
    res.status(401).json({ error });
  }
}
