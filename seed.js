module.exports = function(models, ObjectId){

  var callback = function(err){
    if(err)
      console.log(err);
  }

  models.User.remove({}, callback);

  var user = {
    local: {
      email: "admin@opiumcake.com",
      password: "thepassword"
    },

    createdAt: Date.now(),
    modifiedAt: Date.now(),
    createdBy: "admin",
    modifiedBy: "admin",
    active: true
  };


  var newUser = new models.User(user);

  newUser.local.password = newUser.generateHash(user.local.password);
  newUser.save(callback);

}
