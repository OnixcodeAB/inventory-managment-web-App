import express from "express";
import api from "./api/index.js";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});
app.use(express.json());
app.use("/api/v1", api);

export default app;
