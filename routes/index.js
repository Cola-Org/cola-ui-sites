var express = require('express');
var router = express.Router();
var articles = require("./data/docs-menus")

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {title: 'Express', articles: articles});
});
/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {title: 'Express'});
});

module.exports = router;
