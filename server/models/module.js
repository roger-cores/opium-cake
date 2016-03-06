var mongoose = require('mongoose');
var Audit    = require('./Audit.js');


var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var moduleSchema = mongoose.Schema(Audit.audify({
    name             : {type: String, required: true, unique: true},
    project          : [{type: ObjectId, ref: 'project'}]  
}));


var Module = mongoose.model('module', moduleSchema);

module.exports = Module;
