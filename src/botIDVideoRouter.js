const express = require('express');
const bodyParser = require('body-parser');
const BotIDVideoRouter = express.Router();
BotIDVideoRouter.use(bodyParser.json());

const BotIDVideo = require('./models/botIDVideo');
const encryptToken = require('./shared/encryptToken');


BotIDVideoRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', '*');
        next();
    })
    .get((req, res, next) => {
        BotIDVideo.find().sort({ 'updatedAt': -1 })
            .then(channels => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(channels);
            })
            .catch(err => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(err);
            });
    })
    .post((req, res, next) => {
        BotIDVideo.create(req.body).then((info) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ status: true, detail: '' });
        }).catch(err => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ status: true, detail: '' });
        })
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported');
    })
    .delete((req, res, next) => {
        res.end('DELETE operation not supported');
    });

module.exports = BotIDVideoRouter;
