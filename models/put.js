var mongoose = require('mongoose');
var Audit    = require('./Audit.js');


var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var putSchema = mongoose.Schema(Audit.audify({
    inputJSON           : {type: String, required: true},
    outputJSON             : {type: String},
    responseCode           : {type: String, required: true},
    module                 : [{type: ObjectId, ref: 'module'}]
}));


var Put = mongoose.model('put', putSchema);

module.exports = Put;
