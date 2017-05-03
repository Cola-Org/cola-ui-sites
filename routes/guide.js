var express = require('express');
var router = express.Router();
var pug = require('pug');
var path = require('path');
var fs = require('fs');
router.get('/', function (req, res, next) {
	res.redirect("/guide/model")
});
router.get('/*', function (req, res, next) {
	var templatePath = req.path.length === 1 ? "guide/index" : `guide${req.path}`;

	res.render(templatePath, {
		title: "Cola-UI 文档中心",
		viewPath: templatePath,
		articles: require("./data/guide-menus"),
		filters: [require('jstransformer-marked')]
	});
});

module.exports = router;
