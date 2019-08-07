const express = require('express');
const router = express.Router();

const controller = require('../controller/Controller');

const verifySignUp = require('./verifySignUp');
const authJwt = require('./verifyJwtToken');

/* GET home page. */
router.get('/', controller.home.index);

/* Router for api */

router.post('/api/auth/signIn', controller.auth.signIn);
router.post('/api/auth/signUp', [verifySignUp.checkDuplicateUserNameOrEmail], controller.auth.signUp);
router.get('/api/auth/users', [authJwt.verifyToken], controller.auth.getUser);


router.get('/api/trips', controller.trip.lists);
router.get('/api/trips/:id', controller.trip.show);
router.post('/api/trips', controller.trip.create);
router.post('/api/trips/:id', controller.trip.update);
router.delete('/api/trips/:id', controller.trip.delete);

router.get('/api/places', controller.place.lists);
router.get('/api/places/:id', controller.place.show);
router.post('/api/places', controller.place.create);
router.post('/api/places/:id', controller.place.update);
router.delete('/api/places/:id', controller.place.delete);

module.exports = router;