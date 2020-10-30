import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import databaseOptions from "../config/index.js";
import MongoClient from "mongodb";
import routes from "../routes/index.js";

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.use("/api/swapi", routes.swapi);
app.use("/api/user", routes.user);

MongoClient.connect(
  databaseOptions.url,
  { promiseLibrary: Promise, useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) {
      console.log("Falha na conexão com banco de dados.", err.stack);
      client.close();
    }
    app.locals.db = client.db("swa-test");
    const port = process.env.PORT || 5000;

    app.listen(port, () => console.log(`Server started on port ${port}`));
  }
);
