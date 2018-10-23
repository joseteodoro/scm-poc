const express = require('express');
const router = express.Router();
const controller = require('../controllers/actors');
const { downstream } = require('./downstream');

router.get('/', function (req, res, next) {
    downstream(res)(controller.listAll());
});

router.put('/', function (req, res, next) {
    downstream(res)(controller.updateActor(req.body));
});

router.get('/streak', function (req, res, next) {
    downstream(res)(controller.getStreak());
});

module.exports = router;