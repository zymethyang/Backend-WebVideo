const express = require('express');
const bodyParser = require('body-parser');
const videoRouter = express.Router();
videoRouter.use(bodyParser.json());
const axios = require('axios');
const Video = require('./models/video');
var moment = require('moment');


videoRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', '*');
        next();
    })
    .get((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /temp');
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

videoRouter.route('/id/:id')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', '*');
        next();
    })
    .get((req, res, next) => {
        var id = req.params.id;
        let query = { source: `/.*${id}.*/` }
        Video.findOne({ source: { $regex: id, $options: "x" } })
            .then(video => {
                if (video) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(video);
                } else {
                    axios.get(`https://www.googleapis.com/youtube/v3/videos?part=id,contentDetails,snippet&contentDetails&id=${id}&key=AIzaSyAthUU-wzxrK545NRGetzyw-Kig4EtuQtY`).then((vid) => {
                        if (vid.data.items.length > 0) {
                            Video.create({
                                media: 1,
                                token: null,
                                pub: 1,
                                private: 0,
                                user_id: 1,
                                date: vid.data.items[0].snippet.publishedAt,
                                featured: 0,
                                source: `https://www.youtube.com/watch?v=${vid.data.items[0].id}`,
                                tmp_source: null,
                                title: vid.data.items[0].snippet.title,
                                thumb: vid.data.items[0].snippet.thumbnails.medium.url,
                                duration: moment.duration(vid.data.items[0].contentDetails.duration, moment.ISO_8601).asSeconds(),
                                description: vid.data.items[0].snippet.description,
                                category: vid.data.items[0].snippet.categoryId,
                                views: 0,
                                liked: 0,
                                disliked: 0,
                                nsfw: 0,
                                embed: null,
                                remote: null,
                                srt: null,
                                privacy: 0
                            }).then(() => {
                                Video.findOne({ source: { $regex: id, $options: "x" } }).then(d => {
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.json(d);
                                }).catch(() => {
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.json(null);
                                })
                            })
                        } else {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(null);
                        }
                    })
                }
            })
            .catch(err => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(err);
            });
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
        Video.find().limit(time).sort({ 'date': -1 })
            .then(videos => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(videos);
            })
            .catch(err => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(err);
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


videoRouter.route('/get/:time/:topic')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', '*');
        next();
    })
    .get((req, res, next) => {
        var time = parseInt(req.params.time);
        var topic = parseInt(req.params.topic);
        Video.find({ category: topic }).limit(time).sort({ 'updatedAt': -1 })
            .then(videos => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(videos);
            })
            .catch(err => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(err);
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

/*
videoRouter.route('/related/:title')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', '*');
        next();
    })
    .get((req, res, next) => {
        var title = parseInt(req.params.title);
        Video.aggregate({
            "$lookup": {
                "from": { title: 'FAKER bật Tool Mod Taliyah Farm người thay lính, khổ thân team bạn bất lực buông chuột phút 20' },
                "localField": 'title',
                "foreignField": 'title',
                "as": 'videos'
            }
        }).limit(1).then(videos => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(videos);
        }).catch(err => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(err);
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

*/


module.exports = videoRouter;
