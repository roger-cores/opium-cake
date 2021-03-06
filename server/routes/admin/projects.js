var express = require('express');
var router = express.Router();


module.exports.registerRoutes = function(models, utils) {

  //Admin Panel:
	//get all DONE
	//add DONE
	//deactivate DONE
  //assign/revoke DONE

  router.get('/', function(req, res, next){
      models.Project.find({}, function(err, projects){
        if(err){
          next(err);
        } else if(!projects){
          next({message: 'cant load documents'});
        } else {
          res.status(200).send(projects);
        }
      });
  });

  router.post('/', function(req, res, next){
      new models.Project(req.body).save(function(err, project){
        if(err){
          next(err);
        } else if(!project){
          next({message: 'error creating project'});
        } else {
          res.status(201).send({_id: project._id, _v: project._v});
        }
      });

  });

  router.put('/:id/deactivate', function(req, res, next){
      models.Project.findById(req.params.id, function(err, project){
          if(err){
            next(err);
          } else if(!project){
            next({message: 'project doesnt exist'});
          } else {
            project.active = false;
            project.save(function(err, project){
              if(err){
                next(err);
              } else if(!project){
                  next({message: 'deactivate failed'});
              } else {
                res.status(201).send({_id: project._id, _v: project._v});
              }
            });

          }
      });

  });


  router.put('/:id/toggle-assign/:user_id', function(req, res, next){
      var assigned = false;
      models.Project.findById(req.params.id, function(err, project){
          if(err){
            next(err);
          } else if(!project){
            next({message: 'project doesnt exist'});
          } else {
            if(utils.contains(project.users, req.params.user_id)){
                utils.remove(project.users, req.params.user_id);
                assigned = false;
            } else {
                project.users.push(req.params.user_id);
                assigned = true;
            }

            res.status(201).send({assigned: assigned});
          }
      });
  });

  return router;
}
