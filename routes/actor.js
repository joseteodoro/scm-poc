const express = require('express');
const router = express.Router();
const controller = require('../controllers/actors');
const streakController = require('../controllers/streak');
const { downstream } = require('./downstream');

router.get('/', function (req, res, next) {
    downstream(res)(controller.listAll());
});

router.put('/', function (req, res, next) {
    downstream(res)(controller.updateActor(req.body));
});

router.get('/streak', function (req, res, next) {
    downstream(res)(streakController.streakForAllEvents());
});

module.exports = router;