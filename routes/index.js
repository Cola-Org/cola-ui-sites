const express = require('express');
const router = express.Router();
const articles = require("./data/docs-menus")

/* GET home page. */
router.get('/', (req, res, next) => {
	res.render('index', {title: 'Express', articles: articles});
});
/* GET home page. */
router.get('/', (req, res, next) => {
	res.render('index', {title: 'Express'});
});

module.exports = router;
