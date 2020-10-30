import express from "express";
import log from "../utils/log.js";

const router = express.Router();

router.post("/create", async (request, response, next) => {
  const { id, name, picture, loginType } = request.body;
  try {
    const db = request.app.locals.db;
    const user = db.collection("users");

    await user.insertOne({
      userId: id,
      useName: name,
      picture,
      loginType,
    });

    return response.status(201).json({ message: "Usuário cadastrado!!" });
  } catch (error) {
    return response.status(400).json({ error: e.response.data });
  }
});
export default router;
