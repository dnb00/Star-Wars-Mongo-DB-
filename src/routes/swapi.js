import express from "express";
import axios from "axios";

const router = express.Router();
import log from "../utils/log.js";

router.get("/", async (request, response, next) => {
  await axios.get("https://swapi.dev/api/films/").then((res) => {
    try {
      log(request, 1, "daniel", "https://swapi.dev/api/films/");
    } catch (e) {
      throw e;
    }
    return response.status(200).json({ data: res.data });
  });
});

router.post("/personagens", async (request, response, next) => {
  let urls = request.body.personagens;
  let arr = [];
  await axios
    .all(urls.map((l) => axios.get(l)))
    .then((res) => {
      res.map((x) => arr.push(x.data));
      return response.status(200).json({ personagens: arr });
    })
    .catch((e) => {
      return response.status(400).json({ erro: e.response.data });
    });
});

export default router;
