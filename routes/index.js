var express = require('express');
var router = express.Router();
const async = require('async');
const Messages = require('../models/message');

/* GET home page. */
router.get('/', function(req, res, next) {
  async.parallel({
    messages: (callback) => {
      Messages.find().populate('user').exec(callback);
    }
  }, (err, results) => {
    if (err) {
      return next(err);
    }

    res.render('index', { messages: results.messages, user: req.user });
  });

});

module.exports = router;
