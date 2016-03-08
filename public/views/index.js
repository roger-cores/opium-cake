require('fs').readdirSync(__dirname + '/').forEach(function(file) {
  if (file.match(/\.jade$/) !== null && file !== 'index.js') {
    var name = file.replace('.jade', '');
    exports[name] = name;
    console.log(name);
  }
});