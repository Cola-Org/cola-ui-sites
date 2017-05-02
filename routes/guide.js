const express = require('express');
const router = express.Router();
const pug = require('pug');
const path = require('path');
const fs = require('fs');
router.get('/', (req, res, next) => {
	res.redirect("/guide/model")
});
router.get('/*', (req, res, next) => {
	const templatePath = req.path.length === 1 ? "guide/index" : `guide${req.path}`;

	res.render(templatePath, {
		title: "Cola-UI 文档中心",
		viewPath: templatePath,
		articles: require("./data/guide-menus"),
		filters: [require('jstransformer-marked')]
	});
});

module.exports = router;
