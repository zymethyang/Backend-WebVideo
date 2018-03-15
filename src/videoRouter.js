const express = require('express');
const bodyParser = require('body-parser');
const videoRouter = express.Router();
videoRouter.use(bodyParser.json());

const Video = require('./models/video');
const encryptToken = require('./shared/encryptToken');

videoRouter.route('/')
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


videoRouter.route('/add')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', '*');
        next();
    })
    .get((req, res, next) => {
        res.statusCode = 403;
        res.end('GET operation not supported');
    })
    .post((req, res, next) => {
        Video.create(req.body).then((info) => {
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

videoRouter.route('/get/:num')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', '*');
        next();
    })
    .get((req, res, next) => {
        var time = parseInt(req.params.num);
        Video.find().limit(time).sort({ 'updatedAt': -1 })
            .then(videos => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(videos);
            })
            .catch(err => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(videos);
            });
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



module.exports = videoRouter;
