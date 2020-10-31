import express from "express";
import moment from "moment";
import log from "../utils/log.js";

const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const db = request.app.locals.db;
    const users = db.collection("users");
    await users.find({}).toArray((err, results) => {
      if (results) {
        return response.status(200).json(results);
      }
    });
  } catch (error) {}
});

router.post("/create", async (request, response) => {
  const {
    userId,
    userName,
    picture,
    loginType,
    email,
    age,
    birthday,
    location,
  } = request.body.user;
  try {
    const db = request.app.locals.db;
    const user = db.collection("users");

    await user.findOne({ userId }, function (err, findUser) {
      if (findUser) {
        return response.status(200).json({ message: "Usuário já cadastrado." });
      } else {
        user.insertOne({
          userId,
          userName,
          picture,
          loginType,
          email,
          age,
          birthday,
          location,
          createdAt: moment().format("LTS"),
        });
        log(
          request,
          userId,
          userName,
          loginType,
          request.originalUrl,
          "POST",
          request.body,
          { message: "Usuário cadastrado!!" }
        );
        return response.status(201).json({ message: "Usuário cadastrado!!" });
      }
    });
  } catch (error) {
    log(
      request,
      userId,
      userName,
      loginType,
      request.originalUrl,
      "POST",
      request.body,
      error.response
    );
    return response.status(400).json({ error: error.response.data });
  }
});
export default router;
