module.exports = function(models){

  var callback = function(err){
    if(err)
      console.log(err);
  }

  models.User.remove({}, callback);

  var user = {
    name: "admin",
    email: "admin@opiumcake.com",
    password: "thepassword",

    createdAt: Date.now(),
    modifiedAt: Date.now(),
    createdBy: "admin",
    modifiedBy: "admin",
    active: true
  };

  var user2 = {
    name: "John Doe",
    email: "john.doe@opiumcake.com",
    password: "thepasswordagain",

    createdAt: Date.now(),
    modifiedAt: Date.now(),
    createdBy: "admin",
    modifiedBy: "admin",
    active: true
  }


  var newUser = new models.User(user);
  var newUser2 = new models.User(user2);

  newUser.password = newUser.generateHash(user2.password);
  newUser.save(callback);

  newUser2.password = newUser.generateHash(user2.password);
  newUser2.save(callback);

}
