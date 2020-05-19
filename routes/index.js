var createError = require('http-errors');
var express = require('express');
var router = express.Router();

var urls = {};

function addUrl(details) {
  if (urls[details.key]) return false;

  urls[details.key] = details.value;
  return true;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  var url = req.originalUrl.slice(1);

  if (!url) {
    res.render('index', { title: 'Nowly', links: Object.keys(urls).map(function (item) { return {key: item, value: urls[item]} }) });
  } else if (urls[url]) {
    res.redirect(urls[url]);
  } else {
    next(createError(404));
  }
});

/* PUT new link */
router.post('/', function (req, res, next) {
  if (req.body) {
    if (addUrl(req.body)) {
      res.status(201).end();
    } else {
      next(createError(403));
    }

  } else {
    next();
  }
});

module.exports = router;
