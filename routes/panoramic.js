var express = require('express');
var router = express.Router();
var pug = require('pug');
var path = require('path');
var fs = require('fs');
router.get('/', function (req, res, next) {
	res.redirect("/panoramic/index")
});
router.get('/*', function (req, res, next) {
	var templatePath = req.path.length === 1 ? "panoramic/index" : ("panoramic" + req.path);

	res.render(templatePath, {
		title: "Cola-UI 全景图",
		viewPath: templatePath,
	});
});

module.exports = router;
