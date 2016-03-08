var express = require('express');
var router = express.Router();
var views = require('../../public/views');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'OpiumCake' });
});

var callBackForRender = function(view){
	router.get('/'+view, function(req, res){
		res.render(view);
	});
};

for(var view in views){
	console.log(view);
	if(views.hasOwnProperty(view)){
		callBackForRender(view);
	}
}


module.exports = router;
