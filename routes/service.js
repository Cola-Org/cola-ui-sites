var express = require('express');
var router = express.Router();

router.get('/menus/:moduleName', function(req, res, next)  {
	res.send(require("./data/" + req.params.moduleName + "-menus"));
});

module.exports = router;
