var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Audit    = require('./Audit.js');


var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var projectSchema = mongoose.Schema(Audit.audify({
    name             : {type: String, required: true, unique: true},
    users            : [{type: ObjectId, ref: 'user'}],
    urls             : [{type: String}]
}));


var Project = mongoose.model('project', projectSchema);

module.exports = Project;
