const express = require('express');
const bodyParser = require('body-parser');
const realtimeRouter = express.Router();
realtimeRouter.use(bodyParser.json());

const Realtime = require('./models/realTime');
var FieldValue = require("firebase-admin").firestore.FieldValue;
var moment = require('moment');


realtimeRouter.route('/:uid')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', '*');
        next();
    })
    .get((req, res, next) => {
      var user = firebase.auth().currentUser || false;
      if(user){
          Realtime.find({ uid: user.uid })
          .then(result => {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json(result);
          })
          .catch(err => {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json("Error");
              console.log(err);
          });
      }else{
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json("Error");
      }
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /realtime');
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /realtime');
    })
    .delete((req, res, next) => {
        res.end('DELETE operation not supported on /realtime');
    });


module.exports = realtimeRouter;
