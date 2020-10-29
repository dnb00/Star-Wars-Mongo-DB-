const express = require('express');
const mongodb = require('mongodb');
const moment = require('moment');

async function logEvents(userId,userName,urlAccess){
  const log = await connect();
  try{
    await log.insertOne({
      userId: userId || null,
      userName: userName || null,
      urlAccess: urlAccess || null,
      createdAt: moment().format("LTS")
    })
  }catch(e){
    throw e;
  }
}

async function connect() {
  const client = await mongodb.MongoClient.connect("mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false",{
    useNewUrlParser:true,
    useUnifiedTopology: true
  })

  return client.db('emioloBackEnd').collection('Log');
}

module.exports = logEvents;