const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
const swapi = require('./routes/api/swapi');

 app.use('/api/swapi', swapi);
 //app.use('/api/swapi/personagens', swapi);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));