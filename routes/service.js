const express = require('express');
const router = express.Router();

router.get('/menus/:moduleName', (req, res, next) => {
	res.send(require("./data/" + req.params.moduleName + "-menus"));
});

module.exports = router;
