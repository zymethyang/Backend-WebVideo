require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors')

var config = require('./config');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const url = config.mongoUrl;
const connect = mongoose.connect(url, {
  useMongoClient: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({credentials: true, origin: '*'}));

var port = process.env.PORT || 4000;

const videoRouter = require('./videoRouter');

app.use('/video',videoRouter);

app.listen(port);


console.log(`Server listening at ${port}`);
