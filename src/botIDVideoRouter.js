const express = require('express');
const bodyParser = require('body-parser');
const BotIDVideoRouter = express.Router();
BotIDVideoRouter.use(bodyParser.json());

const BotIDVideo = require('./models/botIDVideo');



BotIDVideoRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', '*');
        next();
    })
    .get((req, res, next) => {
        BotIDVideo.find().limit(2).sort({ 'updatedAt': -1 })
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
        var data = Object.values(req.body);
        BotIDVideo.create(data)
            .then(() => {
                console.log('finished');
            })
            .catch((err) => {
                console.log(err)
            })
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ status: true, detail: '' });
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported');
    })
    .delete((req, res, next) => {
        res.end('DELETE operation not supported');
    });

module.exports = BotIDVideoRouter;
