import express from "express";
import axios from "axios";

const router = express.Router();
import log from "../utils/log.js";

router.get("/", async (request, response, next) => {
  await axios
    .get("https://swapi.dev/api/films/")
    .then((res) => {
      return response.status(200).json({ data: res.data });
    })
    .catch((e) => {
      return response
        .status(400)
        .json({ messsage: JSON.stringify(e.response) });
    });
});

router.post("/personagens", async (request, response, next) => {
  const { personagens, user } = request.body;
  let arr = [];
  await axios
    .all(personagens.map((l) => axios.get(l)))
    .then((res) => {
      res.map((x) => arr.push(x.data));

      log(
        request,
        user.userId,
        user.userName,
        user.loginType,
        request.originalUrl,
        "POST",
        request.body,
        arr
      );

      return response.status(200).json({ personagens: arr });
    })
    .catch((e) => {
      log(
        request,
        user.userId,
        user.userName,
        user.loginType,
        request.originalUrl,
        "POST",
        request.body,
        e.response.data
      );
      return response.status(400).json({ erro: e.response.data });
    });
});

export default router;
