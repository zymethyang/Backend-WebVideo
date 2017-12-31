const express = require('express');
const bodyParser = require('body-parser');
const humidityRouter = express.Router();
humidityRouter.use(bodyParser.json());

const Humiditys = require('./models/humiditys');
const admin = require('firebase-admin');
const firebase = require("firebase");
var FieldValue = require("firebase-admin").firestore.FieldValue;
var moment = require('moment');

humidityRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        next();
    })
    .get((req, res, next) => {
        res.statusCode = 403;
        res.end('GET operation not supported on /humidity');
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /humidity');
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /humidity');
    })
    .delete((req, res, next) => {
        res.end('DELETE operation not support on /humidity');
    });


    humidityRouter.route('/HumidityByTime/:time')
        .all((req, res, next) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.header('Access-Control-Allow-Origin', '*');
            next();
        })
        .get((req, res, next) => {
            var time = parseInt(req.params.time);
            var user = firebase.auth().currentUser || false;
            if(user){
                Humiditys.find({ uid: user.uid }).limit(time).sort({ 'updatedAt': -1 })
                .then(result => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(result);
                })
                .catch(err => {
                    res.statusCode = 403;
                    res.setHeader('Content-Type', 'application/json');
                    res.json("Error");
                    console.log(err);
                });
            }else{
                res.statusCode = 403;
                res.setHeader('Content-Type', 'application/json');
                res.json("Error");
            }
        })
        .post((req, res, next) => {
            res.statusCode = 403;
            res.end('POST operation not supported on');
        })
        .put((req, res, next) => {
            res.statusCode = 403;
            res.end('PUT operation not supported on');
        })
        .delete((req, res, next) => {
            res.end('DELETE operation not supported on');
        });


module.exports = humidityRouter;
