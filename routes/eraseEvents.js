var express = require('express');
var router = express.Router();
const controller = require('../controllers/events');
const { downstream } = require('./downstream');

router.delete('/', function (req, res, next) {
    downstream(res)(controller.eraseAllEvents());
});

module.exports = router;