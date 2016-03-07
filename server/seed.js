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

  var user2 = {
    local: {
      email: "john.doe@opiumcake.com",
      password: "thepasswordagain"
    },

    createdAt: Date.now(),
    modifiedAt: Date.now(),
    createdBy: "admin",
    modifiedBy: "admin",
    active: true
  }


  var newUser = new models.User(user);
  var newUser2 = new models.User(user2);

  newUser.local.password = newUser.generateHash(user2.local.password);
  newUser.save(callback);

  newUser2.local.password = newUser.generateHash(user2.local.password);
  newUser2.save(callback);

}
