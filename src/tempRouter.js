const express = require('express');
const bodyParser = require('body-parser');
const tempRouter = express.Router();
tempRouter.use(bodyParser.json());

const Temps = require('./models/temps');
const firebase = require("firebase");


tempRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', '*');
        next();
    })
    .get((req, res, next) => {
        res.statusCode = 403;
        res.end('GET operation not supported on /temp');
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /temp');
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /temp');
    })
    .delete((req, res, next) => {
        res.end('DELETE operation not supported on /temp');
    });


tempRouter.route('/TempByTime/:time')
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
            Temps.find({ uid: user.uid }).limit(time).sort({ 'updatedAt': -1 })
            .then(result => {
                var arr = new Array(0);

                result.map(res => {
                  arr.push(res.mean);
                })

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(arr);
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
        res.end('POST operation not supported');
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported');
    })
    .delete((req, res, next) => {
        res.end('DELETE operation not supported');
    });


module.exports = tempRouter;
