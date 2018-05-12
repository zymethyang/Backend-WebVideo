const express = require('express');
const bodyParser = require('body-parser');
const BotChannelRouter = express.Router();
BotChannelRouter.use(bodyParser.json());

const BotChannel = require('./models/botChannel');


BotChannelRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', '*');
        next();
    })
    .get((req, res, next) => {
        BotChannel.find().sort({ 'updatedAt': -1 })
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
        BotChannel.create(req.body).then((info) => {
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

module.exports = BotChannelRouter;
