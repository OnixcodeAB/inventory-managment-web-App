import { db } from "./db.js";

export async function logAudit(req, change) {
  try {
    const { userId } = req.payload;
    const user_id = parseInt(userId, 10);

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
          user_id,
          action,
          changes: JSON.stringify(change ? change : req.body),
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ error });
  }
}
