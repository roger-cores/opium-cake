var express = require('express');
var router = express.Router();

/* GET Admin Panel. */
router.get('/', function(req, res, next) {
  res.render('admin', { title: 'OpiumCake' });
});


module.exports = router;
