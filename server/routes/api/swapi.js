const express = require('express');
const axios = require('axios');

const router = express.Router();
const log = require('./log');

router.get("/",async (request,response,next)=>{
  await axios.get("https://swapi.dev/api/films/").then(res => {
    try{
      log(1,"daniel","https://swapi.dev/api/films/")

    }catch(e){
      throw e
    }
    return response.status(200).json({data: res.data})
  })
})

router.get("/personagens",async (request,response,next)=>{
  await axios.get(request.body.urls).then(res => {
    try{
      log(1,"daniel","aaaaaa")
    }catch(e){
      throw e
    }
    return response.status(200).json({data: res.data})
  })
  return response.status(200).json({data: "res.data"})
})

module.exports = router;