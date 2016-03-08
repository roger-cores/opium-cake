var express = require('express');
var router = express.Router();


module.exports.registerRoutes = function(models) {

	//get all DONE
	//add DONE
	//deactivate/ban DONE

	router.get('/', function(req, res, next){
			models.User.find({active: true}, function(err, users){
				if(err){
					next(err);
				} else if(!users){
					next({message: 'cant load documents'});
				} else {
					res.status(200).send(users);
				}
			});
	});

	router.get('/:id', function(req, res, next){
			models.User.findOne({active: true, _id: req.params.id}, function(err, user){
				if(err){
					next(err);
				} else if(!user){
					next({message: 'cant load documents'});
				} else {
					res.status(200).send(user);
				}
			});
	});

	router.post('/', function(req, res, next){

			var newUser = new models.User(req.body);

			newUser.password = newUser.generateHash(req.body.password);

			newUser.save(function(err, user){
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
