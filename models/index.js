var fs        = require("fs");
var mongoose  = require('mongoose');
var models    = this;

var masterData = ["Adjective", "Ingredient", "Unit", "Utensil"];

fs.readdirSync(__dirname + '/').forEach(function(file) {
  if (file.match(/\.js$/) !== null && file != 'connector.js') {
    var name = file.replace('.js', '');
    exports[name] = require('./'+name);
  }
});
