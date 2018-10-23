var express = require('express');
var router = express.Router();
const controller = require('../controllers/events');
const { downstream } = require('./downstream');

router.get('/', function (req, res, next) {
    downstream(res)(controller.listAll());
});

router.post('/', function (req, res, next) {
    downstream(res)(controller.addEvent(req.body));
});

router.get('/actors/:id', function (req, res, next) {
    downstream(res)(controller.getByActor(req.params.id));
});

module.exports = router;