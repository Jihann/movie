var express = require('express');
var router = express.Router();

//测试 jade语法
/* GET users listing. */
router.get('/test', function(req, res, next) {
  res.render('jade/index');
});

module.exports = router;
