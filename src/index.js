require('dotenv').config()
const admin = require('./firebase-admin');
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

var port = process.env.PORT || 3000;

const router = require('./routes');
const userRouter = require('./userRouter');
const tempRouter = require('./tempRouter');
const humidityRouter = require('./humidityRouter');
const bumpRouter = require('./bumpRouter');
const devicesRouter = require('./devicesRouter');
const realTimeRouter = require('./realtimeRouter');
const messagingRouter = require('./messagingRouter');

app.use('/', router);
app.use('/temp',tempRouter);
app.use('/humidity',humidityRouter);
app.use('/user',userRouter);
app.use('/bump',bumpRouter);
app.use('/device',devicesRouter);
app.use('/realtime',realTimeRouter);
app.use('/messaging',messagingRouter);

app.listen(port);


console.log(`Server listening at ${port}`);
