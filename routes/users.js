var express = require('express');
var router = express.Router();


module.exports.registerRoutes = function(models) {

	//get all TODO
	//add TODO
	//deactivate/ban TODO

	router.get('/', function(req, res, next){
			models.User.find({}, function(err, users){
				if(err){
					next(err);
				} else if(!users){
					next({message: 'cant load documents'});
				} else {
					res.status(200).send(users);
				}
			});
	});

	router.post('/', function(req, res, next){
			new models.User(req.body).save(function(err, user){
					if(err){
						next(err);
					} else if(!user){
						next({message: 'There was some error while creating user'});
					} else {
						res.status(201).send({_id: user._id, _v: user._v});
					}
			});
	});

	router.put('/deactivate/:id', function(req, res, next){
		models.User.findById(req.params.id, function(err, user){
			if(err){
				next(err);
			} else if(!user){
				next({message: 'cant load document'});
			} else {
					user.active = false;
					user.save(function(err, user){
							if(err){
								next(err);
							} else {
								res.status(201).send({_id: user._id, _v: user._v});
							}
					});
			}
		});
	});

	return router;
}
