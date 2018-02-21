const express = require('express');
const bodyParser = require('body-parser');
const userRouter = express.Router();
userRouter.use(bodyParser.json());

//const admin = require('./firebase-admin');
const firebase = require('./firebase-admin');


userRouter.route('/register')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'application/json');
        res.end('GET operation do not support on /register');
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'application/json');
        res.end('POST operation do not support on /register');
        /*
        if (req.body.email && req.body.password ) {
            admin.auth().createUser({
                email: req.body.email,
                password: req.body.password
            }).then((userRecord) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(userRecord.uid);
            }).catch(function (error) {
                res.statusCode = 403;
                res.setHeader('Content-Type', 'application/json');
                res.json('Check Your Form !');
                next(error);
            });
        } else {
            res.statusCode = 403;
            next(error);
        }*/
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'application/json');
        res.end('PUT operation not supported on /register');
    })
    .delete((req, res, next) => {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'application/json');
        res.end('DELETE operation not supported on /register');
    });

userRouter.route('/login')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        next();
    })
    .get((req, res, next) => {
        var id_token = googleUser.getAuthResponse().id_token
        console.log(id_token);
        
        /*
      res.statusCode = 403;
      res.setHeader('Content-Type', 'application/json');
      res.end('GET operation not supported on /login');*/
    })
    .post((req, res, next) => {
        firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
            .then((result) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(true);
            })
            .catch(function (error) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(false);
            });
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'application/json');
        res.end('PUT operation not supported on /login');
    })
    .delete((req, res, next) => {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'application/json');
        res.end('DELETE operation not supported on /login');
    });

userRouter.route('/logout')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        next();
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'application/json');
        res.end('POST operation not supported on /logout');
    })
    .get((req, res, next) => {
        firebase.auth().signOut().then(() => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(true);
        }).catch(function (error) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(false);
        });
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /getStatus');
    })
    .delete((req, res, next) => {
        res.statusCode = 403;
        res.end('DELETE operation not supported on /getStatus');
    });


userRouter.route('/getStatus')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        next();
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'application/json');
        res.end('POST operation not supported on /getStatus');
    })
    .get((req, res, next) => {
        var user = firebase.auth().currentUser || false;
        if (user) {
            var id = {
                "uid": user.uid,
                "displayName": user.displayName,
                "photoURL": user.photoURL,
                "email": user.email,
                "emailVerified": user.emailVerified,
                "phoneNumber": user.phoneNumber,
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(id);
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(null);
        }
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /getStatus');
    })
    .delete((req, res, next) => {
        res.statusCode = 403;
        res.end('DELETE operation not supported on /getStatus');
    });

userRouter.route('/getIP')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        next();
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'application/json');
        res.end('POST operation not supported on /getIP');
    })
    .get((req, res, next) => {
        res.statusCode = 200;
        network.get_interfaces_list(function (err, list) {
            res.setHeader('Content-Type', 'application/json');
            res.json(list);
        })
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /getStatus');
    })
    .delete((req, res, next) => {
        res.statusCode = 403;
        res.end('DELETE operation not supported on /getStatus');
    });


module.exports = userRouter;
